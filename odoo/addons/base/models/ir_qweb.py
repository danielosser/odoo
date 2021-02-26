# -*- coding: utf-8 -*-
from __future__ import print_function
from textwrap import dedent
import copy
import json
import logging
from time import time

from lxml import html
from lxml import etree

from odoo import api, models, tools
from odoo.tools.safe_eval import check_values, assert_valid_codeobj, _BUILTINS, to_opcodes, _EXPR_OPCODES, _BLACKLIST
from odoo.tools.misc import get_lang
from odoo.http import request
from odoo.modules.module import get_resource_path

from odoo.addons.base.models.qweb import QWeb
from odoo.addons.base.models.assetsbundle import AssetsBundle
from odoo.addons.base.models.ir_asset import can_aggregate, STYLE_EXTENSIONS, SCRIPT_EXTENSIONS

_logger = logging.getLogger(__name__)


_SAFE_QWEB_OPCODES = _EXPR_OPCODES.union(to_opcodes([
    'YIELD_VALUE',

    'MAKE_FUNCTION', 'CALL_FUNCTION', 'CALL_FUNCTION_KW', 'CALL_FUNCTION_EX',
    'CALL_METHOD', 'LOAD_METHOD',

    'GET_ITER', 'FOR_ITER',
    'JUMP_ABSOLUTE',
    'JUMP_IF_TRUE_OR_POP', 'POP_JUMP_IF_TRUE', 'POP_JUMP_IF_FALSE', 'JUMP_IF_FALSE_OR_POP', 'JUMP_FORWARD',

    'UNPACK_SEQUENCE',
    'LOAD_NAME', 'LOAD_ATTR', 'LOAD_FAST', 'LOAD_GLOBAL',
    'STORE_SUBSCR', 'STORE_FAST',
])) - _BLACKLIST


class IrQWeb(models.AbstractModel, QWeb):
    """ Base QWeb rendering engine
    * to customize ``t-field`` rendering, subclass ``ir.qweb.field`` and
      create new models called :samp:`ir.qweb.field.{widget}`
    Beware that if you need extensions or alterations which could be
    incompatible with other subsystems, you should create a local object
    inheriting from ``ir.qweb`` and customize that.
    """

    _name = 'ir.qweb'
    _description = 'Qweb'

    @api.model
    def _render(self, id_or_xml_id, values=None, **options):
        """ render(id_or_xml_id, values, **options)

        Render the template specified by the given name.

        :param id_or_xml_id: name or etree (see _get_template)
        :param dict values: template values to be used for rendering
        :param options: used to compile the template (the dict available for the rendering is frozen)
            * ``load`` (function) overrides the load method
            * ``profile`` (Boolean) activate the rendering profile displayed in log as debug
        """
        context = dict(self.env.context, dev_mode='qweb' in tools.config['dev_mode'])
        context.update(options)

        body = super(IrQWeb, self)._render(id_or_xml_id, values=values, **context)
        result = u''.join(body).encode('utf8')

        if b'data-pagebreak=' not in result:
            return result

        fragments = html.fragments_fromstring(result.decode('utf-8'))

        for fragment in fragments:
            for row in fragment.iterfind('.//tr[@data-pagebreak]'):
                table = next(row.iterancestors('table'))
                newtable = html.Element('table', attrib=dict(table.attrib))
                thead = table.find('thead')
                if thead:
                    newtable.append(copy.deepcopy(thead))
                # TODO: copy caption & tfoot as well?
                # TODO: move rows in a tbody if row.getparent() is one?

                pos = row.get('data-pagebreak')
                assert pos in ('before', 'after')
                for sibling in row.getparent().iterchildren('tr'):
                    if sibling is row:
                        if pos == 'after':
                            newtable.append(sibling)
                        break
                    newtable.append(sibling)

                table.addprevious(newtable)
                table.addprevious(html.Element('div', attrib={
                    'style': 'page-break-after: always'
                }))

        return b''.join(html.tostring(f) for f in fragments)

    # assume cache will be invalidated by third party on write to ir.ui.view
    def _get_template_cache_keys(self):
        """ Return the list of context keys to use for caching ``_get_template``. """
        return ['lang', 'inherit_branding', 'editable', 'translatable', 'edit_translations', 'website_id', 'profile']

    # apply ormcache_context decorator unless in dev mode...
    @tools.conditional(
        'xml' not in tools.config['dev_mode'],
        tools.ormcache('id_or_xml_id', 'tuple(options.get(k) for k in self._get_template_cache_keys())'),
    )
    def _compile(self, id_or_xml_id, options):
        try:
            id_or_xml_id = int(id_or_xml_id)
        except:
            pass
        return super(IrQWeb, self)._compile(id_or_xml_id, options=options)

    def _load(self, name, options):
        lang = options.get('lang', get_lang(self.env).code)
        env = self.env
        if lang != env.context.get('lang'):
            env = env(context=dict(env.context, lang=lang))

        view_id = self.env['ir.ui.view'].get_view_id(name)
        template = env['ir.ui.view'].sudo()._read_template(view_id)

        # QWeb's `_read_template` will check if one of the first children of
        # what we send to it has a "t-name" attribute having `name` as value
        # to consider it has found it. As it'll never be the case when working
        # with view ids or children view or children primary views, force it here.
        def is_child_view(view_name):
            view_id = self.env['ir.ui.view'].get_view_id(view_name)
            view = self.env['ir.ui.view'].sudo().browse(view_id)
            return view.inherit_id is not None

        if isinstance(name, int) or is_child_view(name):
            view = etree.fromstring(template)
            for node in view:
                if node.get('t-name'):
                    node.set('t-name', str(name))
            return (view, view_id)
        else:
            return (template, view_id)

    # order

    def _directives_eval_order(self):
        directives = super(IrQWeb, self)._directives_eval_order()
        directives.insert(directives.index('call'), 'lang')
        directives.insert(directives.index('field'), 'call-assets')
        return directives

    # compile directives

    def _compile_directive_lang(self, el, options, indent):
        lang = el.attrib.pop('t-lang', "'%s'" % get_lang(self.env).code)
        el.attrib['t-options-lang'] = lang
        return self._compile_node(el, options, indent)

    def _compile_directive_call_assets(self, el, options, indent):
        """ This special 't-call' tag can be used in order to aggregate/minify javascript and css assets"""
        if len(el):
            raise SyntaxError("t-call-assets cannot contain children nodes")

        directive = 't-call-assets="%s"' % el.get('t-call-assets')
        code = self._flushText(options, indent)
        code.extend(self._compile_hook_before_directive(el, directive, options, indent))
        code.append(self._indent(dedent("""
            t_call_assets_nodes = _qweb_self._get_asset_nodes("%(xmlid)s", _qweb_options, css=%(css)s, js=%(js)s, debug=values.get("debug"), async_load=%(async_load)s, defer_load=%(defer_load)s, lazy_load=%(lazy_load)s, media=%(media)s)
            for index, (tagName, attrs, content) in enumerate(t_call_assets_nodes):
                if index:
                    yield u'\\n        '
                yield u'<'
                yield tagName
            """).strip() % {
                'xmlid': self._compile_str(el.get('t-call-assets')),
                'css': self._compile_bool(el.get('t-css', True)),
                'js': self._compile_bool(el.get('t-js', True)),
                'async_load': self._compile_bool(el.get('async_load', False)),
                'defer_load': self._compile_bool(el.get('defer_load', False)),
                'lazy_load': self._compile_bool(el.get('lazy_load', False)),
                'media': '"%s"' % self._compile_str(el.get('media')) if el.get('media') else False,
            }, indent))
        code.extend(self._compile_attributes(options, indent + 1))
        code.append(self._indent(dedent("""
                if not content and tagName in _qweb_self._void_elements:
                    yield u'/>'
                else:
                    yield u'>'
                    if content:
                      yield content
                    yield u'</'
                    yield tagName
                    yield u'>'
                """).strip(), indent + 1))
        code.extend(self._compile_hook_after_directive(el, directive, options, indent))

        return code

    # method called by computing code

    def get_asset_bundle(self, bundle_name, files, env=None, css=True, js=True):
        return AssetsBundle(bundle_name, files, env=env, css=css, js=js)

    def _get_asset_nodes(self, bundle, options, css=True, js=True, debug=False, async_load=False, defer_load=False, lazy_load=False, media=None):
        """Generates asset nodes.
        If debug=assets, the assets will be regenerated when a file which composes them has been modified.
        Else, the assets will be generated only once and then stored in cache.
        """
        if debug and 'assets' in debug:
            return self._generate_asset_nodes(bundle, options, css, js, debug, async_load, defer_load, lazy_load, media)
        else:
            return self._generate_asset_nodes_cache(bundle, options, css, js, debug, async_load, defer_load, lazy_load, media)

    @tools.conditional(
        # in non-xml-debug mode we want assets to be cached forever, and the admin can force a cache clear
        # by restarting the server after updating the source code (or using the "Clear server cache" in debug tools)
        'xml' not in tools.config['dev_mode'],
        tools.ormcache_context('bundle', 'options.get("lang", "en_US")', 'css', 'js', 'debug', 'async_load', 'defer_load', 'lazy_load', keys=("website_id",)),
    )
    def _generate_asset_nodes_cache(self, bundle, options, css=True, js=True, debug=False, async_load=False, defer_load=False, lazy_load=False, media=None):
        return self._generate_asset_nodes(bundle, options, css, js, debug, async_load, defer_load, lazy_load, media)

    def _generate_asset_nodes(self, bundle, options, css=True, js=True, debug=False, async_load=False, defer_load=False, lazy_load=False, media=None):
        nodeAttrs = None
        if css and media:
            nodeAttrs = {
                'media': media,
            }
        files, remains = self._get_asset_content(bundle, options, nodeAttrs)
        asset = self.get_asset_bundle(bundle, files, env=self.env, css=css, js=js)
        remains = [node for node in remains if (css and node[0] == 'link') or (js and node[0] == 'script')]
        return remains + asset.to_node(css=css, js=js, debug=debug, async_load=async_load, defer_load=defer_load, lazy_load=lazy_load)

    def _get_asset_link_urls(self, bundle, options):
        asset_nodes = self._get_asset_nodes(bundle, options, js=False)
        return [node[1]['href'] for node in asset_nodes if node[0] == 'link']

    @tools.ormcache_context('bundle', 'options.get("lang", "en_US")', keys=("website_id",))
    def _get_asset_content(self, bundle, options, nodeAttrs=None):
        options = dict(options,
            inherit_branding=False, inherit_branding_auto=False,
            edit_translations=False, translatable=False,
            rendering_bundle=True)

        options['website_id'] = self.env.context.get('website_id')

        asset_paths = self.env['ir.asset']._get_asset_paths(bundle=bundle, css=True, js=True)

        files = []
        remains = []
        for path, *_ in asset_paths:
            ext = path.split('.')[-1]
            is_js = ext in SCRIPT_EXTENSIONS
            is_css = ext in STYLE_EXTENSIONS
            if not is_js and not is_css:
                continue

            mimetype = 'text/javascript' if is_js else 'text/%s' % ext
            if can_aggregate(path):
                segments = [segment for segment in path.split('/') if segment]
                files.append({
                    'atype': mimetype,
                    'url': path,
                    'filename': get_resource_path(*segments) if segments else None,
                    'content': '',
                    'media': nodeAttrs and nodeAttrs.get('media'),
                })
            else:
                if is_js:
                    tag = 'script'
                    attributes = {
                        "type": mimetype,
                        "src": path,
                    }
                else:
                    tag = 'link'
                    attributes = {
                        "type": mimetype,
                        "rel": "stylesheet",
                        "href": path,
                        'media': nodeAttrs and nodeAttrs.get('media'),
                    }
                remains.append((tag, attributes, ''))

        return (files, remains)

    def _get_field(self, record, field_name, expression, tagName, field_options, options, values):
        field = record._fields[field_name]

        # adds template compile options for rendering fields
        field_options['template_options'] = options

        # adds generic field options
        field_options['tagName'] = tagName
        field_options['expression'] = expression
        field_options['type'] = field_options.get('widget', field.type)
        inherit_branding = options.get('inherit_branding', options.get('inherit_branding_auto') and record.check_access_rights('write', False))
        field_options['inherit_branding'] = inherit_branding
        translate = options.get('edit_translations') and options.get('translatable') and field.translate
        field_options['translate'] = translate

        # field converter
        model = 'ir.qweb.field.' + field_options['type']
        converter = self.env[model] if model in self.env else self.env['ir.qweb.field']

        # get content
        content = converter.record_to_html(record, field_name, field_options)
        attributes = converter.attributes(record, field_name, field_options, values)

        return (attributes, content, inherit_branding or translate)

    def _get_widget(self, value, expression, tagName, field_options, options, values):
        # adds template compile options for rendering fields
        field_options['template_options'] = options

        field_options['type'] = field_options['widget']
        field_options['tagName'] = tagName
        field_options['expression'] = expression

        # field converter
        model = 'ir.qweb.field.' + field_options['type']
        converter = self.env[model] if model in self.env else self.env['ir.qweb.field']

        # get content
        content = converter.value_to_html(value, field_options)
        attributes = dict()
        attributes['data-oe-type'] = field_options['type']
        attributes['data-oe-expression'] = field_options['expression']

        return (attributes, content, None)

    def _hook_before_directive(self, xpath, directive, values, options):
        return (time(), self.env.cr.sql_log_count)

    def _hook_after_directive(self, xpath, directive, values, options, loginfo):
        now, query = loginfo
        delay = (time() - now) * 1000
        dquery = self.env.cr.sql_log_count - query
        _logger.debug({
            'ref': options.get('ref'),
            'xpath': xpath,
            'directive': directive,
            'time': now,
            'delay': delay,
            'query': dquery,
        })

    def _prepare_values(self, values, options):
        """ Prepare the context that will sent to the compiled and evaluated
        function. Check if the values received are safe (according to
        safe_eval's semantics).

        :param values: template values to be used for rendering
        :param options: frozen dict of compilation parameters.
        """
        check_values(values)
        values['true'] = True
        values['false'] = False
        if 'request' not in values:
            values['request'] = request
        if 'cache_assets' not in values:
            values['cache_assets'] = round(time()/180)
        return super(IrQWeb, self)._prepare_values(values, options)

    def _prepare_globals(self, globals_dict, options):
        """ Prepare the global context that will sent to eval the qweb generated
        code. Add the secure '__builtins__' value.

        :param values: template values to be used for rendering
        :param options: frozen dict of compilation parameters.
        """
        globals_dict = super(IrQWeb, self)._prepare_globals(globals_dict, options)
        globals_dict['__builtins__'] = _BUILTINS
        return globals_dict

    def _compile_expr(self, expr, raise_on_missing=False):
        """ Compiles a purported Python expression to compiled code, verifies
        that it's safe (according to safe_eval's semantics) and alter its
        variable references to access values data instead

        :param expr: string
        """
        namespace_expr = super(IrQWeb, self)._compile_expr(expr, raise_on_missing=raise_on_missing)
        assert_valid_codeobj(_SAFE_QWEB_OPCODES, compile(namespace_expr, '<>', 'eval'), expr)
        return namespace_expr

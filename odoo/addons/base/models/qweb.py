# -*- coding: utf-8 -*-
import ast
import logging
import os.path
import re
import traceback
import builtins
import types
import token
import tokenize
import io
from itertools import count, chain
from textwrap import dedent, indent as _indent
from time import time

from lxml import etree
from psycopg2.extensions import TransactionRollbackError
import werkzeug
from werkzeug.utils import escape as _escape

from odoo.tools import pycompat, freehash, parse_version

_logger = logging.getLogger(__name__)

####################################
###          qweb tools          ###
####################################

# to remove after v15
class Qweb_deprecated_foreach():
    def __add__(self, other):
        return self.__repr__()

    def __sub__(self, other):
        return self.__repr__()

    def __and__(self, other):
        return self.__repr__()

    def __or__(self, other):
        return self.__repr__()

    def __eq__(self, other):
        return self.__repr__()

    def __lt__(self, other):
        return self.__repr__()

    def __le__(self, other):
        return self.__repr__()

    def __gt__(self, other):
        return self.__repr__()

    def __ge__(self, other):
        return self.__repr__()

    def __int__(self):
        return self.__repr__()

    def __repr__(self):
        raise ValueError('Deprecated use: "_size", "_first", "_last", "_odd", "_event", "_parity" values are no longer automatically added in t-foreach')

class QWebException(Exception):
    def __init__(self, message, error=None, path=None, html=None, name=None, code=None):
        self.error = error
        self.message = message
        self.path = path
        self.html = html
        self.name = name
        self.code = code
        self.stack = traceback.format_exc()
        if self.error is not None:
            self.message = "%s\n%s: %s" % (self.message, self.error.__class__.__name__, self.error)
        if self.name is not None:
            self.message = "%s\nTemplate: %s" % (self.message, self.name)
        if self.path is not None:
            self.message = "%s\nPath: %s" % (self.message, self.path)
        if self.html is not None:
            self.message = "%s\nNode: %s" % (self.message, self.html)
        if self.code is not None:
            self.message = "%s\nCode: %s" % (self.message, self.code)

        super(QWebException, self).__init__(message)

    def __str__(self):
        message = "%s\n%s\n%s" % (self.error, self.stack, self.message)
        if self.code:
            message = "%s\nCompiled code:\n%s" % (message, self.code)
        return message

    def __repr__(self):
        return str(self)

class frozendict(dict):
    """ An implementation of an immutable dictionary. """
    def __delitem__(self, key):
        raise NotImplementedError("'__delitem__' not supported on frozendict")
    def __setitem__(self, key, val):
        raise NotImplementedError("'__setitem__' not supported on frozendict")
    def clear(self):
        raise NotImplementedError("'clear' not supported on frozendict")
    def pop(self, key, default=None):
        raise NotImplementedError("'pop' not supported on frozendict")
    def popitem(self):
        raise NotImplementedError("'popitem' not supported on frozendict")
    def setdefault(self, key, default=None):
        raise NotImplementedError("'setdefault' not supported on frozendict")
    def update(self, *args, **kwargs):
        raise NotImplementedError("'update' not supported on frozendict")
    def __hash__(self):
        return hash(frozenset((key, freehash(val)) for key, val in self.items()))

# Avoid DeprecationWarning while still remaining compatible with werkzeug pre-0.9
escape = (lambda text: _escape(text, quote=True)) if parse_version(getattr(werkzeug, '__version__', '0.0')) < parse_version('0.9.0') else _escape

unsafe_eval = eval
allowed_keyword = ['False', 'None', 'True', 'and', 'as', 'elif', 'else', 'for', 'if', 'in', 'is', 'not', 'or']

_FORMAT_REGEX = re.compile(r'(?:#\{(.+?)\})|(?:\{\{(.+?)\}\})') # ( ruby-style )|(  jinja-style  )
_VARNAME_REGEX = re.compile(r'[^a-zA-Z0-9_]')
_STRIP_REGEX = re.compile(r'[\s\n\r\t]+')
_EMPTY_LINE_REGEX = re.compile(r'\n\s*\n')


####################################
###             QWeb             ###
####################################


class QWeb(object):
    __slots__ = ()

    _void_elements = frozenset([
        'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'keygen',
        'link', 'menuitem', 'meta', 'param', 'source', 'track', 'wbr'])
    _name_gen = count()
    _builtins_names = []

    def _render(self, template, values=None, **options):
        """ render(template, values, **options)

        Render the template specified by the given name.

        :param template: template identifier
        :param dict values: template values to be used for rendering
        :param options: used to compile the template (the dict available for the rendering is frozen)
            * ``load`` (function) overrides the load method (returns: (template, ref))
            * ``qweb_strip`` (boolean) remove a part of excessive space
            * ``profile`` (boolean) profile the rendering
        """
        render_template = self._compile(template, options)
        return render_template(self, values or {})

    def _compile(self, template, options):
        """ Compile the given template into a rendering function (generator)::

            render(qweb, values)

        where ``qweb`` is a QWeb instance and ``values`` are the values to render.
        """
        if options is None:
            options = {}

        element, document, ref = self._get_template(template, options)
        if not ref:
            ref = element.get('t-name', str(document))

        options['ref'] = ref
        if 'profile' in options:
            options['document'] = document if isinstance(document, str) else str(document, 'utf-8')

        _options = dict(options)
        options = frozendict(options)

        _options['template'] = template
        _options['root'] = element.getroottree()
        _options['last_path_node'] = None
        if not options.get('nsmap'):
            _options['nsmap'] = {}

        def manage_exception(e, path, code=None):
            if not options.get('dev_mode'):
                code = None
            element = self._get_template(template, options)[0]
            html = None
            if path and ':' not in path:
                nodes = element.getroottree().xpath(path)
                if nodes:
                    node = nodes[0]
                    while len(node) > 0: # remove children for the error log
                        node.remove(node[0])
                    html = etree.tostring(node, encoding='unicode')
            return QWebException("Error when compiling template code", e, path, html, template, code=code)

        if not self._builtins_names:
            globals_dict = self._prepare_globals({}, {})
            self._builtins_names.extend((globals_dict['__builtins__']))

        # generate code

        def_name = "template%s" % ("_%s" % ref if isinstance(ref, int) else "")

        try:
            self._strip(element, options)
            _options['_text_concat'] = []
            self._appendText("", _options) # to have at least one yield
            code_lines = [dedent("""def %s(_qweb_self, values, log):""") % def_name] + \
                self._compile_hook_before_directive(None, None, _options, 1) + \
                self._compile_node(element, _options, 1) + \
                self._compile_hook_after_directive(None, None, _options, 1) + \
                self._flushText(_options, 1)
        except QWebException as e:
            raise e
        except Exception as e:
            raise manage_exception(e, _options['last_path_node'])

        try:
            code = u'\n'.join(code_lines)
        except QWebException as e:
            raise e
        except Exception as e:
            raise manage_exception(e, _options['last_path_node'], u'\n'.join(map(str, code_lines)))

        # compile code and defined default values

        try:
            # noinspection PyBroadException
            globals_dict = self._prepare_globals(dict(format=self._format), options)
            compiled = compile(code, '<%s>' % def_name, 'exec')
            unsafe_eval(compiled, globals_dict)
            compiled_fn = globals_dict[def_name]
        except QWebException as e:
            raise e
        except Exception as e:
            raise manage_exception(e, _options['last_path_node'], code)

        # return the wrapped function

        def render_template(self, values):
            try:
                log = {'last_path_node': None}
                yield from compiled_fn(self, self._prepare_values(values, options), log)
            except (QWebException, TransactionRollbackError) as e:
                raise e
            except Exception as e:
                raise manage_exception(e, log['last_path_node'], code)

        return render_template

    def _get_template(self, template, options):
        """ Retrieve the given template, and return it as a pair ``(element,
        document)``, where ``element`` is an etree, and ``document`` is the
        string document that contains ``element``.
        """
        ref = template
        if isinstance(template, etree._Element):
            element = template
            document = etree.tostring(template)
            return (element, document, template.get('t-name'))
        else:
            try:
                document, ref = options.get('load', self._load)(template, options)
            except QWebException as e:
                raise e
            except Exception as e:
                template = options.get('caller_template', template)
                path = options.get('last_path_node')
                raise QWebException("load could not load template", e, path, name=template)

        if document is None:
            raise QWebException("Template not found", name=template)

        if isinstance(document, etree._Element):
            element = document
            document = etree.tostring(document, encoding='utf-8')
        elif not document.strip().startswith('<') and os.path.exists(document):
            element = etree.parse(document).getroot()
        else:
            element = etree.fromstring(document)

        for node in element:
            if node.get('t-name') == str(template):
                return (node, document, ref)
        return (element, document, ref)

    def _load(self, template, options, indent):
        """ Load a given template. """
        return (template, None)

    # values for running time

    def _prepare_values(self, values, options):
        """ Prepare the context that will sent to the compiled and evaluated
        function.

        :param values: template values to be used for rendering
        :param options: frozen dict of compilation parameters.
        """
        return values

    def _prepare_globals(self, globals_dict, options):
        """ Prepare the global context that will sent to eval the qweb generated
        code.

        :param values: template values to be used for rendering
        :param options: frozen dict of compilation parameters.
        """
        globals_dict['_qweb_GeneratorType'] = types.GeneratorType
        globals_dict['_qweb_to_text'] = pycompat.to_text
        globals_dict['_qweb_import'] = __import__
        def merge_dict(d1, d2):
            d1.update(d2)
            return d1
        globals_dict['_qweb_merged_dict'] = merge_dict
        globals_dict['_qweb_options'] = options
        globals_dict['__builtins__'] = builtins

        # to remove after v15
        globals_dict['_qweb_deprecated_foreach'] = Qweb_deprecated_foreach()

        return globals_dict

    def _format(self, value, formating, *args, **kwargs):
        format = getattr(self, '_format_func_%s' % formating, None)
        if not format:
            raise ValueError("Unknown format '%s'" % (formating,))
        return format(value, *args, **kwargs)

    # compute helpers

    def _appendText(self, text, options):
        options['_text_concat'].append(pycompat.to_text(text))

    def _flushText(self, options, indent):
        text_concat = options['_text_concat']
        if text_concat:
            # yield text
            text = u''.join(text_concat)
            if options.get('qweb_strip'):
                text = _EMPTY_LINE_REGEX.sub('\n', text)
            text_concat.clear()
            return [('    ' * indent) + 'yield """%s"""' % text]
        else:
            return []

    def _strip(self, el, options):
        if not options.get('qweb_strip'):
            return

        text_concat = options.get('_text_concat')
        if text_concat:
            text = u''.join(text_concat).rstrip()
            text_concat.clear()
            text_concat.append(text)

        if el.text: el.text = el.text.strip()
        if el.tail: el.tail = el.tail.strip()

    def _indent(self, code, indent):
        return _indent(code, '    ' * indent)

    def _make_name(self, prefix='var'):
        return "%s_%s" % (prefix, next(self._name_gen))

    def _compile_node(self, el, options, indent):
        """ Compile the given element.

        :return: list of AST nodes
        """
        if el.get("groups"):
            el.set("t-groups", el.attrib.pop("groups"))

        # if tag don't have qweb attributes don't use directives
        if self._is_static_node(el, options):
            return self._compile_static_node(el, options, indent)

        path = options['root'].getpath(el)
        if options['last_path_node'] != path:
            options['last_path_node'] = path
            body = [self._indent('log["last_path_node"] = "%s"' % self._compile_str(path), indent)]
        else:
            body = []

        # create an iterator on directives to compile in order
        options['iter_directives'] = iter(self._directives_eval_order() + [None])

        el.set('t-tag', el.tag)
        if not (set(['t-esc', 't-raw', 't-field']) & set(el.attrib)):
            el.set('t-content', 'True')

        return body + self._compile_directives(el, options, indent)

    def _compile_directives(self, el, options, indent):
        """ Compile the given element, following the directives given in the
        iterator ``options['iter_directives']``.

        :return: list of code lines
        """

        if self._is_static_node(el, options):
            el.attrib.pop('t-tag', None)
            el.attrib.pop('t-content', None)
            return self._compile_static_node(el, options, indent)

        # compile the first directive present on the element
        for directive in options['iter_directives']:
            if ('t-' + directive) in el.attrib:
                mname = directive.replace('-', '_')
                compile_handler = getattr(self, '_compile_directive_%s' % mname, None)

                interpret_handler = 'render_tag_%s' % mname
                if hasattr(self, interpret_handler):
                    _logger.warning(
                        "Directive '%s' must be AST-compiled. Dynamic interpreter %s will ignored",
                        mname, interpret_handler
                    )

                return compile_handler(el, options, indent)

        # all directives have been compiled, there should be none left
        if any(att.startswith('t-') for att in el.attrib):
            raise NameError("Unknown directive on %s" % etree.tostring(el, encoding='unicode'))
        return []

    def _compile_options(self, el, varname, options, indent):
        """
        compile t-options and add to the dict the t-options-xxx values
        """
        t_options = el.attrib.pop('t-options', None)
        directive = ''
        if t_options:
            directive = 't-options="%s"' % t_options

        code = []
        dict_arg = []
        for key in dict(el.attrib):
            if key.startswith('t-options-'):
                value = el.attrib.pop(key)
                directive += ' %s="%s"' % (key, value)
                option_name = key[10:]
                dict_arg.append('"%s":%s' % (self._compile_str(option_name), self._compile_expr(value)))

        if t_options and dict_arg:
            code.append(self._indent("%s = _qweb_merged_dict(dict(%s), {%s})" % (varname, self._compile_expr(t_options), u', '.join(dict_arg)), indent))
        elif t_options:
            code.append(self._indent("%s = dict(%s)" % (varname, self._compile_expr(t_options)), indent))
        elif dict_arg:
            code.append(self._indent("%s = {%s}" % (varname, u', '.join(dict_arg)), indent))

        if code:
            return self._compile_hook_before_directive(el, directive, options, indent) + \
                code + \
                self._compile_hook_after_directive(el, directive, options, indent)

        return code

    def _compile_format(self, expr):
        """ Parses the provided format string and compiles it to a single
        expression ast, uses string concatenation via "+".
        """
        text = '"'
        base_idx = 0
        for m in _FORMAT_REGEX.finditer(expr):
            literal = expr[base_idx:m.start()]
            if literal:
                text += self._compile_str(literal if isinstance(literal, str) else literal.decode('utf-8'))
            text += '" + _qweb_to_text(%s) + "' % self._compile_expr(m.group(1) or m.group(2))
            base_idx = m.end()
        # string past last regex match
        literal = expr[base_idx:]
        if literal:
            text += self._compile_str(literal if isinstance(literal, str) else literal.decode('utf-8'))
        text += '"'
        return text

    def _compile_expr(self, expr, raise_on_missing=False):
        result = []

        tokens = list(tokenize.tokenize(io.BytesIO(expr.strip().encode('utf-8')).readline))
        tokens_len = len(tokens)

        brackets = 0
        index = 0
        is_for_params = []
        if ' for ' in expr:
            while index < tokens_len:
                t = tokens[index]
                if t.type == token.OP and t.string in ['(', '[', '{']:
                    brackets += 1
                elif t.type == token.OP and t.string in [')', ']', '}']:
                    brackets -= 1
                elif t.type == token.NAME and t.string == 'for':
                    keys = []
                    while tokens[index] and (tokens[index].type == token.OP or tokens[index].type == token.NAME and tokens[index].string != 'in'):
                        if tokens[index].type == token.NAME:
                            keys.append(tokens[index].string)
                        index += 1
                    is_for_params.append((brackets, keys))
                index += 1

        is_function_params = [] # list brackets index
        is_lambda_params = [] # list of tuple (brackets index, keys)
        brackets = 0
        index = 0
        pos = (0, 0) # to keep indent when use expr on multi line
        while index < tokens_len:
            t = tokens[index]

            if t.start[0] != pos[0]:
                pos = (t.start[0], 0)
            space = t.start[1] - pos[1]
            if space:
                result.append(' ' * space)
            pos = t.start

            if t.type == tokenize.ENCODING or t.type == token.ENDMARKER or t.type == token.DEDENT:
                pass
            elif t.type == token.OP and t.string in ['(', '[', '{']: # tuple, function, lambda, for
                result.append(t.string)
                brackets += 1
                if index > 0 and t.string == '(' and tokens[index - 1].type == token.NAME:
                    is_function_params.append(brackets)
            elif t.type == token.OP and t.string in [')', ']', '}']: # tuple, function, lambda, for
                result.append(t.string)
                if is_function_params and is_function_params[-1] == brackets:
                    is_function_params.pop()
                while is_lambda_params and is_lambda_params[-1][0] >= brackets:
                    is_lambda_params.pop()
                brackets -= 1
            elif t.type == token.OP and t.string == ',' and is_lambda_params and is_lambda_params[-1][0] >= brackets: # close lambda
                while is_lambda_params and is_lambda_params[-1][0] >= brackets:
                    is_lambda_params.pop()
                result.append(t.string)
            elif t.type == token.OP and t.string == '.': # attributes
                result.append(t.string)
                if index + 1 < tokens_len and tokens[index + 1].type == token.NAME:
                    result.append(tokens[index + 1].string)
                    index += 1
            elif t.type == token.NAME and t.string == 'lambda': # lambda => allowed values
                result.append('lambda ')
                index += 1
                keys = []
                while tokens[index] and (tokens[index].type == token.OP or tokens[index].type == token.NAME) and tokens[index].string != ':':
                    if tokens[index].type == token.NAME:
                        key = tokens[index].string
                        result.append('_qweb_temp_%s' % key)
                        keys.append(key)
                    else:
                        result.append(tokens[index].string)
                    index += 1
                result.append(':')
                is_lambda_params.append((brackets, keys))
            elif t.type == token.NAME and t.string in allowed_keyword: # keywords
                result.append(t.string)
            elif t.type == token.NAME and any(t.string in p[1] for p in is_lambda_params): # allowed key word from lambda params
                result.append('_qweb_temp_%s' % t.string)
            elif t.type == token.NAME and any(p[0] <= brackets and t.string in p[1] for p in is_for_params): # allowed key word from lambda params
                result.append('_qweb_temp_%s' % t.string)
            elif t.type == token.NAME and is_function_params and index + 1 < tokens_len and tokens[index + 1].string == '=': # function kw
                if t.string.startswith('_qweb_'):
                    raise ValueError("The value should not prefixed by '_qweb_' in '%s'" % expr)
                result.append(t.string)
            elif t.type == token.NAME and t.string in self._builtins_names: # builtins_names
                result.append(t.string)
            elif t.type == token.NAME: # namespacing of var name
                key = t.string
                if raise_on_missing or index + 1 < tokens_len and tokens[index + 1].string in ['.', '(', '[']:
                    # Should have values['product'].price to raise an error when get
                    # the 'product' value and not an 'NoneType' object has no
                    # attribute 'price' error.
                    result.append('values["%s"]' % key)
                else:
                    # not assignation allowed, only getter
                    result.append('values.get("%s")' % key)
            else:
                result.append(t.string)

            t = tokens[index]
            index += 1

            if t.end[0] != pos[0]:
                pos = (t.end[0], 0)
            else:
                pos = t.end

        return u"(%s)" % u''.join(result)

    def _compile_bool(self, attr, default=False):
        if attr:
            if attr is True:
                return True
            attr = attr.lower()
            if attr in ('false', '0'):
                return False
            elif attr in ('true', '1'):
                return True
        return bool(default)

    def _compile_str(self, expr):
        return str(expr).replace('"', '\\"').replace("'", "\\'")

    def _compile_str_html(self, expr):
        return escape(expr)

    # order

    def _directives_eval_order(self):
        """ List all supported directives in the order in which they should be
        evaluated on a given element. For instance, a node bearing both
        ``foreach`` and ``if`` should see ``foreach`` executed before ``if`` aka
        .. code-block:: xml
            <el t-foreach="foo" t-as="bar" t-if="bar">
        should be equivalent to
        .. code-block:: xml
            <t t-foreach="foo" t-as="bar">
                <t t-if="bar">
                    <el>
        then this method should return ``['foreach', 'if']``.
        """
        return [
            'debug',
            'groups', 'foreach', 'if', 'elif', 'else',
            'field', 'esc', 'raw',
            'tag',
            'call',
            'set',
            'content',
        ]

    def _is_static_node(self, el, options):
        """ Test whether the given element is purely static, i.e., does not
        require dynamic rendering for its attributes.
        """
        return el.tag != 't' and not any(att.startswith('t-') and att not in ['t-tag', 't-content'] for att in el.attrib)

    # compile

    def _compile_hook_before_directive(self, el, directive, options, indent):
        if 'profile' not in options:
            return []

        path = el is not None and options['root'].getpath(el) or ""
        loginfo = re.sub(_VARNAME_REGEX, '_', 'loginfo_%s_%s' % (path, directive))
        return [self._indent(
            """%(loginfo)s = _qweb_self._hook_before_directive("%(path)s", "%(directive)s", values, _qweb_options)""" % {
                'path': self._compile_str(path),
                'directive': self._compile_str(directive or ''),
                'loginfo': loginfo,
            }, indent)]

    def _compile_hook_after_directive(self, el, directive, options, indent):
        if 'profile' not in options:
            return []

        path = el is not None and options['root'].getpath(el) or ""
        loginfo = re.sub(_VARNAME_REGEX, '_', 'loginfo_%s_%s' % (path, directive))
        return [self._indent(
            """_qweb_self._hook_after_directive("%(path)s", "%(directive)s", values, _qweb_options, %(loginfo)s)""" % {
                'path': self._compile_str(path),
                'directive': self._compile_str(directive or ''),
                'loginfo': loginfo,
            }, indent)]

    def _compile_static_node(self, el, options, indent):
        """ Compile a purely static element into a list of AST nodes. """
        if not el.nsmap:
            unqualified_el_tag = el_tag = el.tag
            attrib = self._post_processing_att(el.tag, el.attrib, options)
        else:
            # Etree will remove the ns prefixes indirection by inlining the corresponding
            # nsmap definition into the tag attribute. Restore the tag and prefix here.
            unqualified_el_tag = etree.QName(el.tag).localname
            el_tag = unqualified_el_tag
            if el.prefix:
                el_tag = '%s:%s' % (el.prefix, el_tag)

            attrib = {}
            # If `el` introduced new namespaces, write them as attribute by using the
            # `attrib` dict.
            for ns_prefix, ns_definition in set(el.nsmap.items()) - set(options['nsmap'].items()):
                if ns_prefix is None:
                    attrib['xmlns'] = ns_definition
                else:
                    attrib['xmlns:%s' % ns_prefix] = ns_definition

            # Etree will also remove the ns prefixes indirection in the attributes. As we only have
            # the namespace definition, we'll use an nsmap where the keys are the definitions and
            # the values the prefixes in order to get back the right prefix and restore it.
            ns = chain(options['nsmap'].items(), el.nsmap.items())
            nsprefixmap = {v: k for k, v in ns}
            for key, value in el.attrib.items():
                attrib_qname = etree.QName(key)
                if attrib_qname.namespace:
                    attrib['%s:%s' % (nsprefixmap[attrib_qname.namespace], attrib_qname.localname)] = value
                else:
                    attrib[key] = value

            attrib = self._post_processing_att(el.tag, attrib, options)

            # Update the dict of inherited namespaces before continuing the recursion. Note:
            # since `options['nsmap']` is a dict (and therefore mutable) and we do **not**
            # want changes done in deeper recursion to bevisible in earlier ones, we'll pass
            # a copy before continuing the recursion and restore the original afterwards.
            original_nsmap = dict(options['nsmap'])

        if unqualified_el_tag != 't':
            self._appendText(u'<%s%s' % (self._compile_str_html(el_tag), u''.join([u' %s=\\"%s\\"' % (self._compile_str_html(name), self._compile_str_html(pycompat.to_text(value))) for name, value in attrib.items()])), options)
            if unqualified_el_tag in self._void_elements:
                self._appendText(u'/>', options)
            else:
                self._appendText(u'>', options)

        if el.nsmap:
            options['nsmap'].update(el.nsmap)
            body = self._compile_directive_content(el, options, indent)
            options['nsmap'] = original_nsmap
        else:
            body = self._compile_directive_content(el, options, indent)

        if unqualified_el_tag != 't':
            if unqualified_el_tag not in self._void_elements:
                self._appendText(u'</%s>' % self._compile_str_html(el_tag), options)

        return body

    def _compile_attributes(self, options, indent):
        body = self._flushText(options, indent)
        body.append(self._indent(dedent("""
            attrs = _qweb_self._post_processing_att(tagName, attrs, _qweb_options)
            for name, value in attrs.items():
                if value or isinstance(value, str):
                    yield u' '
                    yield name
                    yield u'="'
                    yield _qweb_self._compile_str_html(_qweb_to_text(value))
                    yield u'"'
        """).strip(), indent))
        return body

    def _compile_static_attributes(self, el, options, indent):
        """ Compile the static and dynamc attributes of the given element into
        a list of pairs (name, expression AST).

        We do not support namespaced dynamic attributes.
        """
        # Etree will also remove the ns prefixes indirection in the attributes. As we only have
        # the namespace definition, we'll use an nsmap where the keys are the definitions and
        # the values the prefixes in order to get back the right prefix and restore it.
        nsprefixmap = {v: k for k, v in chain(options['nsmap'].items(), el.nsmap.items())}

        code = []
        for key, value in el.attrib.items():
            if not key.startswith('t-'):
                attrib_qname = etree.QName(key)
                if attrib_qname.namespace:
                    key = '%s:%s' % (nsprefixmap[attrib_qname.namespace], attrib_qname.localname)
                code.append(self._indent('''attrs["%(key)s"] = "%(value)s"''' % {
                        'key': self._compile_str(key),
                        'value': self._compile_str(value),
                    }, indent))
        return code

    def _compile_dynamic_attributes(self, el, options, indent):
        """ Compile the dynamic attributes of the given element into a list of
        pairs (name, expression AST).

        We do not support namespaced dynamic attributes.
        """
        code = []
        for name, value in el.attrib.items():
            directive = '%s="%s"' % (name, value)
            code.extend(self._compile_hook_before_directive(el, directive, options, indent))

            if name.startswith('t-attf-'):
                code.append(self._indent("""attrs["%(key)s"] = %(value)s""" % {
                        'key': self._compile_str(name[7:]),
                        'value': self._compile_format(value),
                    }, indent))
            elif name.startswith('t-att-'):
                code.append(self._indent("""attrs["%(key)s"] = %(value)s""" % {
                        'key': self._compile_str(name[6:]),
                        'value': self._compile_expr(value),
                    }, indent))
            elif name == 't-att':
                code.append(self._indent("""attrs.update(_qweb_self._get_dynamic_att("%(tag)s", %(value)s, _qweb_options, values))""" % {
                    'tag': self._compile_str(el.tag),
                    'value': self._compile_expr(value),
                }, indent))

            code.extend(self._compile_hook_after_directive(el, directive, options, indent))
        return code

    def _compile_all_attributes(self, el, options, indent, attr_already_created=False):
        """ Compile the attributes of the given elements into a list of AST nodes. """
        code = []
        if any(name.startswith('t-att') or not name.startswith('t-') for name, value in el.attrib.items()):
            if not attr_already_created:
                attr_already_created = True
                code.append(self._indent("""attrs = dict()""", indent))
            code.extend(self._compile_static_attributes(el, options, indent))
            code.extend(self._compile_dynamic_attributes(el, options, indent))
        if attr_already_created:
            code.append(self._indent('''tagName = "%s"''' % self._compile_str(el.tag), indent))
            code.extend(self._compile_attributes(options, indent))
        return code

    def _compile_tag_open(self, el, options, indent, attr_already_created=False):
        """ Compile the tag of the given element into a list of AST nodes. """
        extra_attrib = {}
        if not el.nsmap:
            unqualified_el_tag = el_tag = el.tag
        else:
            # Etree will remove the ns prefixes indirection by inlining the corresponding
            # nsmap definition into the tag attribute. Restore the tag and prefix here.
            # Note: we do not support namespace dynamic attributes, we need a default URI
            # on the root and use attribute directive t-att="{'xmlns:example': value}".
            unqualified_el_tag = etree.QName(el.tag).localname
            el_tag = unqualified_el_tag
            if el.prefix:
                el_tag = '%s:%s' % (el.prefix, el_tag)

            # If `el` introduced new namespaces, write them as attribute by using the
            # `extra_attrib` dict.
            for ns_prefix, ns_definition in set(el.nsmap.items()) - set(options['nsmap'].items()):
                if ns_prefix is None:
                    extra_attrib['xmlns'] = ns_definition
                else:
                    extra_attrib['xmlns:%s' % ns_prefix] = ns_definition

        code = []
        if unqualified_el_tag != 't':
            self._appendText(u'<%s%s' % (self._compile_str_html(el_tag), u''.join([u' %s=\\"%s\\"' % (name, self._compile_str_html(pycompat.to_text(value))) for name, value in extra_attrib.items()])), options)
            code.extend(self._compile_all_attributes(el, options, indent, attr_already_created))
            if unqualified_el_tag in self._void_elements:
                self._appendText(u'/>', options)
            else:
                self._appendText(u'>', options)

        return code

    def _compile_tag_close(self, el, options):
        if not el.nsmap:
            unqualified_el_tag = el_tag = el.tag
        else:
            unqualified_el_tag = etree.QName(el.tag).localname
            el_tag = unqualified_el_tag
            if el.prefix:
                el_tag = '%s:%s' % (el.prefix, el_tag)

        if unqualified_el_tag != 't' and el_tag not in self._void_elements:
            self._appendText(u'</%s>' % self._compile_str_html(el_tag), options)
        return []

    # compile directives

    def _compile_directive_debug(self, el, options, indent):
        debugger = el.attrib.pop('t-debug')
        code = []
        if options.get('dev_mode'):
            code.append(self._indent("_qweb_import('%s').set_trace()" % re.sub(r'[^a-zA-Z]', '', debugger), indent))  # pdb, ipdb, pudb, ...
        else:
            _logger.warning("@t-debug in template is only available in dev mode options")
        code.extend(self._compile_directives(el, options, indent))
        return code

    def _compile_directive_strip(self, el, options, indent):
        code = self._flushText(options, indent)
        options['qweb_strip'] = self._compile_bool(el.attrib.pop('t-strip'))
        code.extend(self._compile_directives(el, options, indent))
        return code

    def _compile_directive_tag(self, el, options, indent):
        el.attrib.pop('t-tag', None)

        code = self._compile_tag_open(el, options, indent, False)

        # Update the dict of inherited namespaces before continuing the recursion. Note:
        # since `options['nsmap']` is a dict (and therefore mutable) and we do **not**
        # want changes done in deeper recursion to bevisible in earlier ones, we'll pass
        # a copy before continuing the recursion and restore the original afterwards.
        if el.nsmap:
            code.extend(self._compile_directives(el, dict(options, nsmap=el.nsmap), indent))
        else:
            code.extend(self._compile_directives(el, options, indent))

        code.extend(self._compile_tag_close(el, options))

        return code

    def _compile_directive_set(self, el, options, indent):
        varname = el.attrib.pop('t-set')
        directive = 't-set="%s"' % varname
        code = self._flushText(options, indent)

        self._strip(el, options)

        if 't-value' in el.attrib:
            expr = el.attrib.pop('t-value') or 'None'
            directive = '%s t-value="%s"' % (directive, expr)
            expr = self._compile_expr(expr)
        elif 't-valuef' in el.attrib:
            exprf = el.attrib.pop('t-valuef')
            directive = '%s t-valuef="%s"' % (directive, exprf)
            expr = self._compile_format(exprf)
        else:
            # set the content as value
            def_name = "qweb_t_set_%s" % re.sub(_VARNAME_REGEX, '_', options['last_path_node'])
            content = self._compile_directive_content(el, options, indent + 1) + self._flushText(options, indent + 1)
            if content:
                code.append(self._indent("""def %s():""" % def_name, indent))
                code.extend(content)
                expr = """u''.join(%s())""" % def_name
            else:
                expr = """u''"""

        code.extend(self._compile_hook_before_directive(el, directive, options, indent))
        code.append(self._indent("""values["%(varname)s"] = %(expr)s""" % {
                'varname': self._compile_str(varname),
                'expr': expr,
            }, indent))
        code.extend(self._compile_hook_after_directive(el, directive, options, indent))
        return code

    def _compile_directive_content(self, el, options, indent):
        if el.text is not None:
            self._appendText(self._compile_str(el.text), options)
        body = []
        if el.getchildren():
            for item in el:
                # ignore comments & processing instructions
                if isinstance(item, etree._Comment):
                    continue
                body.extend(self._compile_node(item, options, indent))
                if item.tail is not None:
                    self._appendText(self._compile_str(item.tail), options)
        return body

    def _compile_directive_else(self, el, options, indent):
        if el.attrib.pop('t-else') == '_t_skip_else_':
            return []
        if not options.pop('t_if', None):
            raise ValueError("t-else directive must be preceded by t-if directive")
        compiled = self._compile_directives(el, options, indent)
        el.attrib['t-else'] = '_t_skip_else_'
        return compiled

    def _compile_directive_elif(self, el, options, indent):
        _elif = el.attrib['t-elif']
        if _elif == '_t_skip_else_':
            el.attrib.pop('t-elif')
            return []
        if not options.pop('t_if', None):
            raise ValueError("t-elif directive must be preceded by t-if directive")
        compiled = self._compile_directive_if(el, options, indent)
        el.attrib['t-elif'] = '_t_skip_else_'
        return compiled

    def _compile_directive_if(self, el, options, indent):
        if 't-elif' in el.attrib:
            expr = el.attrib.pop('t-elif')
            directive = 't-elif="%s"' % expr
        else:
            expr = el.attrib.pop('t-if')
            directive = 't-if="%s"' % expr

        self._strip(el, options)

        code = self._flushText(options, indent)
        content_if = self._compile_directives(el, options, indent + 1) + self._flushText(options, indent + 1)

        orelse = []
        next_el = el.getnext()
        comments_to_remove = []
        while isinstance(next_el, etree._Comment):
            comments_to_remove.append(next_el)
            next_el = next_el.getnext()
        if next_el is not None and {'t-else', 't-elif'} & set(next_el.attrib):
            parent = el.getparent()
            for comment in comments_to_remove:
                parent.remove(comment)
            if el.tail and not el.tail.isspace():
                raise ValueError("Unexpected non-whitespace characters between t-if and t-else directives")
            el.tail = None
            orelse = self._compile_node(next_el, dict(options, t_if=True), indent + 1) + self._flushText(options, indent + 1)

        code.extend(self._compile_hook_before_directive(el, directive, options, indent))
        code.append(self._indent("""if %s:""" % self._compile_expr(expr), indent))
        code.extend(self._compile_hook_after_directive(el, directive, options, indent + 1))
        code.extend(content_if or [self._indent('pass', indent + 1)])
        if orelse or 'profile' in options:
            code.append(self._indent("""else:""", indent))
            code.extend(self._compile_hook_after_directive(el, directive, options, indent + 1))
            code.extend(orelse)
        return code

    def _compile_directive_groups(self, el, options, indent):
        groups = el.attrib.pop('t-groups')
        directive = 'groups="%s"' % groups
        self._strip(el, options)
        code = self._flushText(options, indent)
        code.extend(self._compile_hook_before_directive(el, directive, options, indent))
        code.append(self._indent("""if _qweb_self.user_has_groups("%s"):""" % self._compile_str(groups), indent))
        code.extend(self._compile_hook_after_directive(el, directive, options, indent + 1))
        code.extend(self._compile_directives(el, options, indent + 1) + self._flushText(options, indent + 1) or [self._indent('pass', indent + 1)])
        return code

    def _compile_directive_foreach(self, el, options, indent):
        expr_foreach = el.attrib.pop('t-foreach')
        expr_as = el.attrib.pop('t-as')
        directive = 't-foreach="%s" t-as="%s"' % (expr_foreach, expr_as)

        self._strip(el, options)
        if options.get('qweb_strip') and el.getchildren():
            child = el.getchildren()[-1]
            if child.tail: child.tail = child.tail.strip()

        # to remove after v15
        deprecated_regexp = re.compile(r'(^|[^a-zA-Z0-9_])%s(_size|_first|_last|_odd|_event|_parity)([^a-zA-Z0-9_]|$)' % expr_as)
        has_deprecated_value = any(any(att.startswith('t-') and re.search(deprecated_regexp, child.attrib[att]) for att in child.attrib) for child in el.iter())

        enum = self._make_name('enum')
        varname = self._compile_str(expr_as)
        code = self._flushText(options, indent)
        content_foreach = self._compile_directives(el, options, indent + 1) + self._flushText(options, indent + 1)
        code.extend(self._compile_hook_before_directive(el, directive, options, indent))
        stop_profiling = self._compile_hook_after_directive(el, directive, options, 0)

        code.append(self._indent(dedent("""
                %(enum)s = %(expr)s or []
                %(enum_list)s = enumerate(%(enum)s.items()) if isinstance(%(enum)s, dict) else [(index, (value, value)) for index, value in enumerate(%(enum)s)]
                for (values["%(varname)s_index"], (values["%(varname)s"], values["%(varname)s_value"])) in %(enum_list)s:
            """) % {
                'enum': enum,
                'enum_list': self._make_name('enum_list'),
                'expr': self._compile_expr(expr_foreach),
                'varname': varname,
            }, indent))

        # to remove after v15
        if has_deprecated_value:
            code.append(self._indent(dedent("""
                if "%(varname)s_size" not in values: values["%(varname)s_size"] = _qweb_deprecated_foreach
                if "%(varname)s_first" not in values: values["%(varname)s_first"] = _qweb_deprecated_foreach
                if "%(varname)s_last" not in values: values["%(varname)s_last"] = _qweb_deprecated_foreach
                if "%(varname)s_odd" not in values: values["%(varname)s_odd"] = _qweb_deprecated_foreach
                if "%(varname)s_event" not in values: values["%(varname)s_event"] = _qweb_deprecated_foreach
                if "%(varname)s_parity" not in values: values["%(varname)s_parity"] = _qweb_deprecated_foreach
            """) % {
                'varname': self._compile_str(expr_as),
            }, indent+1))

        if stop_profiling:
            code.append(self._indent("""if values["%(varname)s_index"] == 0:""" % {'varname': varname}, indent + 1))
            for line in stop_profiling:
                code.append(self._indent(line, indent + 2))

        code.append(self._indent("""log["last_path_node"] = "%(path)s" """ % {'path': self._compile_str(options['root'].getpath(el))}, indent + 1))
        code.extend(content_foreach or self._indent('continue', indent + 1))

        if stop_profiling:
            code.append(self._indent("""if not %(enum)s:""" % {'enum': enum}, indent))
            for line in stop_profiling:
                code.append(self._indent(line, indent + 1))

        return code

    def _compile_directive_esc(self, el, options, indent, name="esc"):
        expr = el.attrib.pop('t-' + name)
        directive = 't-%s="%s"' % (name, expr)
        code = self._flushText(options, indent)
        code_options = self._compile_options(el, 't_%s_t_options' % name, options, indent)
        code.extend(code_options)
        code.extend(self._compile_hook_before_directive(el, directive, options, indent))

        if expr == "0":
            if code_options or name == "esc":
                code.append(self._indent("""content = u''.join(values.get("0", []))""", indent))
            else:
                code.append(self._indent("""content = values.get("0", [])""", indent))
        else:
            code.append(self._indent("""content = %s""" % self._compile_expr(expr), indent))

        if code_options:
            code.append(self._indent(dedent("""
                    attrs, content, force_display = _qweb_self._get_widget(content, "%(expr)s", "%(tag)s", t_%(name)s_t_options, _qweb_options, values)
                    content = _qweb_to_text(content)
                """) % {
                    'expr': self._compile_str(expr),
                    'tag': self._compile_str(el.tag),
                    'name': name,
                }, indent))
        else:
            if name == "esc":
                code.append(self._indent(dedent("""
                    if content is not False and content is not None:
                        content = _qweb_self._compile_str_html(_qweb_to_text(content))
                    """).strip(), indent))
            code.append(self._indent("""force_display = None""", indent))

        code.extend(self._compile_widget_value(el, directive, options, indent, without_attributes=not code_options))
        return code

    def _compile_directive_raw(self, el, options, indent):
        return self._compile_directive_esc(el, options, indent, 'raw')

    def _compile_directive_field(self, el, options, indent):
        """ Compile something like ``<span t-field="record.phone">+1 555 555 8069</span>`` """
        tagName = el.tag
        assert tagName not in ("table", "tbody", "thead", "tfoot", "tr", "td",
                                 "li", "ul", "ol", "dl", "dt", "dd"),\
            "RTE widgets do not work correctly on %r elements" % tagName
        assert tagName != 't',\
            "t-field can not be used on a t element, provide an actual HTML node"
        assert "." in el.get('t-field'),\
            "t-field must have at least a dot like 'record.field_name'"

        expression = el.attrib.pop('t-field')
        directive = 't-field="%s"' % expression
        record, field_name = expression.rsplit('.', 1)

        code = []
        code_options = self._compile_options(el, 't_field_t_options', options, indent)
        if code_options:
            code.extend(code_options)
        else:
            code.append(self._indent('t_field_t_options = dict()', indent))

        code.extend(self._compile_hook_before_directive(el, directive, options, indent))
        code.append(self._indent("""attrs, content, force_display = _qweb_self._get_field(%(record)s, "%(field_name)s", "%(expression)s", "%(tagName)s", t_field_t_options, _qweb_options, values)""" % {
            'record': self._compile_expr(record, raise_on_missing=True),
            'field_name': self._compile_str(field_name),
            'expression': self._compile_str(expression),
            'tagName': self._compile_str(tagName),
        }, indent))
        code.extend(self._compile_widget_value(el, directive, options, indent))
        return code

    def _compile_widget_value(self, el, directive, options, indent=0, without_attributes=False):
        el.attrib.pop('t-tag', None)

        code = self._flushText(options, indent)
        code.append(self._indent("""if content is not None and content is not False:""", indent))
        code.extend(self._compile_tag_open(el, options, indent + 1, not without_attributes))
        code.extend(self._flushText(options, indent + 1))
        code.append(self._indent(dedent("""
                if isinstance(content, (_qweb_GeneratorType, list)):
                    yield from content
                else:
                    yield _qweb_to_text(content)
        """).strip(), indent + 1))
        code.extend(self._compile_tag_close(el, options))
        code.extend(self._flushText(options, indent + 1))

        code.extend(self._compile_hook_after_directive(el, directive, options, indent))
        default_body = self._compile_directive_content(el, options, indent + 1)
        if default_body or options['_text_concat']:
            # default content
            _text_concat = list(options['_text_concat'])
            options['_text_concat'].clear()
            code.append(self._indent("""else:""", indent))
            code.extend(self._compile_tag_open(el, options, indent + 1, not without_attributes))
            code.extend(default_body)
            options['_text_concat'].extend(_text_concat)
            code.extend(self._compile_tag_close(el, options))
            code.extend(self._flushText(options, indent + 1))
        else:
            content = self._compile_tag_open(el, options, indent + 1, not without_attributes) + \
                self._compile_tag_close(el, options) + \
                self._flushText(options, indent + 1)
            if content:
                code.append(self._indent("""elif force_display:""", indent))
                code.extend(content)

        return code

    def _compile_directive_call(self, el, options, indent):
        expr = el.attrib.pop('t-call')
        directive = 't-call="%s"' % expr
        _values = self._make_name('values_copy')

        self._strip(el, options)

        if el.attrib.get('t-call-options'): # retro-compatibility
            el.attrib.set('t-options', el.attrib.pop('t-call-options'))

        nsmap = options.get('nsmap')

        code = self._flushText(options, indent)
        code_options = self._compile_options(el, 't_call_t_options', options, indent)
        code.extend(code_options)
        code.extend(self._compile_hook_before_directive(el, directive, options, indent))

        # content (t-raw="0" and variables)
        def_name = "t_call_content"
        content = self._compile_directive_content(el, options, indent + 1) + self._flushText(options, indent + 1)
        if content:
            code.append(self._indent("""def %s(_qweb_self, values, log):""" % def_name, indent))
            code.extend(content)
            code.append(self._indent("""t_call_values = values.copy()""", indent))
            code.append(self._indent("""t_call_values["0"] = list(%s(_qweb_self, t_call_values, log))""" % def_name, indent))
        else:
            code.append(self._indent("""t_call_values = values.copy()""", indent))
            code.append(self._indent("""t_call_values["0"] = []""", indent))

        # options
        code.append(self._indent(dedent("""
            t_call_options = _qweb_options.copy()
            t_call_options.update({
                'caller_template': "%(template)s",
                'last_path_node': "%(last)s",
            })
            """ % {
                'template': self._compile_str(str(options.get('template'))),
                'last': self._compile_str(str(options['root'].getpath(el)))
            }).strip(), indent))
        if nsmap:
            # update this dict with the current nsmap so that the callee know
            # if he outputting the xmlns attributes is relevenat or not
            nsmap = []
            for key, value in options['nsmap'].items():
                nsmap.append('%s:"%s"' % ('"%s"' % self._compile_str(key) if isinstance(key, str) else None, self._compile_str(value)))
            code.append(self._indent("""t_call_options.update(nsmap={%s})""" % (', '.join(nsmap)), indent))

        # call
        if code_options:
            code.append(self._indent("""t_call_options.update(t_call_t_options)""", indent))
            code.append(self._indent(dedent("""
                if _qweb_options.get('lang') != t_call_options.get('lang'):
                    _qweb_self_lang = _qweb_self.with_context(lang=t_call_options.get('lang'))
                    yield from _qweb_self_lang._compile(%(template)s, t_call_options)(_qweb_self_lang, t_call_values)
                else:
                    yield from _qweb_self._compile(%(template)s, t_call_options)(_qweb_self, t_call_values)
                """ % {
                    'template': self._compile_format(expr)
                }).strip(), indent))
        else:
            code.append(self._indent(dedent("""
                yield from _qweb_self._compile(%(template)s, t_call_options)(_qweb_self, t_call_values)
                """).strip() % {'template': self._compile_format(expr)}, indent))

        code.extend(self._compile_hook_after_directive(el, directive, options, indent))

        return code

    # method called by computing code

    def _get_dynamic_att(self, tagName, atts, options, values):
        if isinstance(atts, dict):
            return atts
        if isinstance(atts, (list, tuple)) and not isinstance(atts[0], (list, tuple)):
            atts = [atts]
        if isinstance(atts, (list, tuple)):
            atts = dict(atts)
        return atts

    def _post_processing_att(self, tagName, atts, options):
        """ Method called by the compiled code. This method may be overwrited
            to filter or modify the attributes after they are compiled.

            @returns dict
        """
        return atts

    def _get_field(self, record, field_name, expression, tagName, field_options, options, values):
        """
        :returns: tuple:
            * dict: attributes
            * string or None: content
            * boolean: force_display display the tag if the content and default_content are None
        """
        return self._get_widget(getattr(record, field_name, None), expression, tagName, field_options, options, values)

    def _get_widget(self, value, expression, tagName, field_options, options, values):
        """
        :returns: tuple:
            * dict: attributes
            * string or None: content
            * boolean: force_display display the tag if the content and default_content are None
        """
        return (dict(), value, False)

    def _hook_before_directive(self, xpath, directive, values, options, indent):
        return time()

    def _hook_after_directive(self, xpath, directive, values, options, loginfo):
        dt = (time() - loginfo) * 1000
        _logger.debug({
            'ref': options.get('ref'),
            'xpath': xpath,
            'directive': directive,
            'time': loginfo,
            'delay': dt,
        })

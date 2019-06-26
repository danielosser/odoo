odoo.define('website.editor.we3', function (require) {
'use strict';

var core = require('web.core');
var _t = core._t;

var OdooWebsite = class extends we3.AbstractPlugin {
    static get conflicts () {
        return ['TestToolbarMedia'];
    }
    constructor () {
        super(...arguments);
        this.dependencies = ['Range', 'Arch', 'Renderer', 'Rules'];
    }

    //--------------------------------------------------------------------------
    // Live cycle
    //--------------------------------------------------------------------------

    start () {
        var self = this;
        super.start();
        this._overwriteBootstrap();
        this.dependencies.Range.on('focus', this, this._onFocusNode);

        this.dependencies.Rules.addEditableNodeCheck(function (archNode) {
            if (archNode.isRoot()) {
                return false;
            }
            if (!archNode.className) {
                return undefined;
            }
            if (archNode.className.contains('o_not_editable')) {
                return false;
            }
            if (archNode.className.contains('o_editable')) {
                return true;
            }
        });

        this.dependencies.Rules.addParserRule(function (archNode) {
            if (!archNode.attributes || !archNode.attributes['data-oe-model']) {
                return;
            }
            if (archNode.isWebsiteEditable) {
                return;
            }
            self._configureEditableArchNode(archNode);
        });
    }
    destroy () {
        super.destroy();
        $.fn.carousel = this.init_bootstrap_carousel;
    }

    /**
     * @overwrite
     */
    changeEditorValue (changes) {
        var Range = this.dependencies.Range;
        var focused = Range.getFocusedNode();
        var editable = focused.ancestor('isWebsiteEditable');
        if (editable && !editable.className.contains('o_dirty')) {
            editable.className.add('o_dirty');
            var Arch = this.dependencies.Arch;
            Arch.bypassChangeTrigger(function () {
                Arch.importUpdate([{
                    id: editable.id,
                    attributes: editable.attributes,
                }], Range.getRange());
            });
        }
    }

    //--------------------------------------------------------------------------
    // Public
    //--------------------------------------------------------------------------

    getBrandingNodeIds () {
        var ids = [];
        var Arch = this.dependencies.Arch;
        var Renderer = this.dependencies.Renderer;
        Arch.getClonedArchNode(1).nextUntil(function (next) {
            if (next.isWebsiteEditable && next.isWebsiteEditable()) {
                ids.push(next.id);
            }
        });
        return ids;
    }
    setEditorValue () {
        var ids = this.getBrandingNodeIds();
        this._postRenderingReadOnly(ids);
    }

    //--------------------------------------------------------------------------
    // Private
    //--------------------------------------------------------------------------

    _configureEditableArchNode (archNode) {
        archNode.className.add('o_editable');
        archNode.getFieldType = function () {
            return this.attributes['data-oe-type'] || 'html';
            // TOTO: use for paste text only in not html field
            // TODO: drop image only in image or html field
            // TODO: can choose only image in media
            // ===> var type = achNode.ancestor('isWebsiteEditable').getFieldType();
        };
        archNode.isDirty = function () {
            return this.className.contains('o_dirty');
        };
        archNode.isEditable = function () {
            return !this.isReadOnly();
        };
        archNode.isReadOnly = function () {
            // TODO use for display readonly tooltip
            return this.attributes['data-oe-readonly'] || this.className.contains('o_not_editable');
        };
        archNode.isWebsiteEditable = function () {
            return true;
        };
    }
    _onFocusNode (focused) {
        var focused = this.dependencies.Range.getFocusedNode();
        var editable = focused.ancestor('isWebsiteEditable');
        var res_model = editable && editable.attributes['data-oe-model'];
        var res_id = editable && +editable.attributes['data-oe-id'];
        var xpath = editable && editable.attributes['data-oe-xpath'];

        if (!res_model && $('html').data('editable')) {
            var object = $('html').data('main-object');
            res_model = object.split('(')[0];
            res_id = +object.split('(')[1].split(',')[0];
        }

        if (focused.ancestor('isMedia') && (res_model === 'website.page' || res_model === 'ir.ui.view')) {
            res_id = 0;
            res_model = 'ir.ui.view';
            xpath = null;
        }

        this.options.xhr.res_model = res_model;
        this.options.xhr.res_id = res_id;
        this.options.xhr.xpath = xpath;

        if (res_model) {
            console.log(res_model, res_id, xpath);
        }
    }
    _overwriteBootstrap () {
        var self = this;
        // BOOTSTRAP preserve
        this.init_bootstrap_carousel = $.fn.carousel;
        $.fn.carousel = function () {
            var res = self.init_bootstrap_carousel.apply(this, arguments);
            // off bootstrap keydown event to remove event.preventDefault()
            // and allow to change cursor position
            $(this).off('keydown.bs.carousel');
            return res;
        };
    }
    _postRenderingReadOnly (ids) {
        var Arch = this.dependencies.Arch;
        var Renderer = this.dependencies.Renderer;
        var readonly = ids.filter(function (id) {
            return Arch.getClonedArchNode(id).isReadOnly();
        });
        var $readonly = $(readonly.map(function (id) {
            return Renderer.getElement(id);
        }));
        $readonly.tooltip({
                container: 'body',
                trigger: 'hover',
                delay: {
                    'show': 1000,
                    'hide': 100,
                },
                placement: 'bottom',
                title: _t("Readonly field")
            })
            .on('click', function () {
                $(this).tooltip('hide');
            });
    }
};

we3.addPlugin('OdooWebsite', OdooWebsite);

});

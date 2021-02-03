odoo.define('website.snippet_filter_widget', function (require) {
'use strict';

const Dialog = require('web.Dialog');
const Widget = require('web.Widget');
const {_t, qweb} = require('web.core');


const InDialogWidget = Widget.extend({
    template: 'website.snippet_filter_dialog',
    xmlDependencies: [
        '/website/static/src/snippets/s_dynamic_snippet/filter_widget/filter_widget.xml',
    ],
    events: {
        'change select[name="filter_template"]': '_onTemplateSelect',
    },

    init(parent, defaultValues) {
        this.defaultValues = defaultValues;
        this.modelFields = {
            text: ['name', 'display_name', 'etc'],
        };
        return this._super(...arguments);
    },

    start() {
        this.$content = this.$('.o_we_snippet_filter_fields');
        return this._super(...arguments);
    },

    _onTemplateSelect(ev) {
        this.$content.empty();
        if (!ev.target.value) {
            return;
        }
        const fields = JSON.parse(ev.target.value);
        fields.text.forEach(fieldLabel => {
            this.$content.append(qweb.render('website.snippet_filter_text_field', {
                fieldLabel: fieldLabel,
                possibleFields: this.modelFields.text,
            }));
        });
    },
});

const filterWidget = Widget.extend({
    /**
     * @override
     */
    async create() {
        // TODO: pass a compatible template if possible.
        const newFilterData = await this._openDialog();
        debugger;
        if (!newFilterData) {
            return;
        }
        return this._rpc({
            model: 'website.snippet.filter',
            method: 'create',
            args: [newFilterData],
        });
    },
    /**
     * @override
     */
    async edit(filterId) {
        const initialFilterData = await this._rpc({
            model: 'website.snippet.filter',
            method: 'read',
            args: [[filterId]],
        })[0];
        // TODO: pass a compatible template if possible.
        const newFilterData = await this._openDialog(initialFilterData);
        debugger;
        if (!newFilterData) {
            return;
        }
        return this._rpc({
            model: 'website.snippet.filter',
            method: 'write',
            args: [[filterId], newFilterData],
        });
    },
    /**
     * @override
     */
    async _openDialog(defaultValues = {}) {
        const filterTemplates = await this._rpc({
            model: 'ir.ui.view',
            method: 'search_read',
            args: [
                [['key', 'ilike', '.dynamic_filter_template_'], ['type', '=', 'qweb']],
                ['name'],
            ],
        });
        // TODO: add this info to the filter template model when it's created
        // and make 'call_to_action_url' configurable
        filterTemplates.forEach(template => {
            template.fields = {
                text: ['Title', 'Subtitle', 'Description'],
                image: ['Picture'],
            };
        });
        Object.assign(defaultValues, {filterTemplates});
        const inDialogWidget = new InDialogWidget(this, defaultValues);
        await inDialogWidget.appendTo(document.createDocumentFragment());
        return new Promise(resolve => {
            new Dialog(this, {
                title: _t("Edit snippet filter"),
                $content: inDialogWidget.$el,
                buttons: [
                    {
                        text: _t("Save"),
                        classes: 'btn-primary',
                        click: () => {
                            // TODO: Collect data
                            resolve();
                        },
                    }, {
                        text: _t("Discard"),
                        close: true,
                        click: () => resolve(),
                    },
                ],
                onForceClose: resolve,
            }).open();
        });
    },
});

return filterWidget;
});

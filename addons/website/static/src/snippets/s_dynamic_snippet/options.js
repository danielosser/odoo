odoo.define('website.s_dynamic_snippet_options', function (require) {
'use strict';

const options = require('web_editor.snippets.options');
const FilterWidget = require('website.snippet_filter_widget');

const dynamicSnippetOptions = options.Class.extend({
    /**
     * @override
     */
    init: function () {
        this._super.apply(this, arguments);
        this.dynamicFilters = {};
        this.dynamicFilterTemplates = {};
        this.filterWidget = new FilterWidget(this);
        this.filterState = {
            editing: false,
            isCreate: false,
            name: '',
            fields: {},
        };
    },
    /**
     * @override
     */
    willStart() {
        return Promise.all([
            this._super(...arguments),
            this.filterWidget.appendTo(document.createDocumentFragment()),
        ]);
    },
    /**
     * @override
     */
    onBuilt: function () {
        this._setOptionsDefaultValues();
    },
    /**
     * @override
     */
    async updateUI() {
        if (this.rerender) {
            this.rerender = false;
            return this._rerenderXML();
        }
        return this._super(...arguments);
    },

    //--------------------------------------------------------------------------
    // Options
    //--------------------------------------------------------------------------

    /**
     * @see this.selectClass for parameters
     */
    selectDataAttribute(previewMode, widgetValue, params) {
        this._super.apply(this, arguments);
        if (params.attributeName === 'filterId' && previewMode === false) {
            const record = JSON.parse(params.recordData);
            this.$target[0].dataset.numberOfRecords = record.limit;
        }
    },
    /**
     * @see this.selectClass for parameters
     */
    editFilter(previewMode, widgetValue, params) {
        Object.assign(this.filterState, {editing: true, isCreate: false});
        this.rerender = true;
    },
    /**
     * @see this.selectClass for parameters
     */
    createFilter(previewMode, widgetValue, params) {
        Object.assign(this.filterState, {editing: true, isCreate: true});
        this.rerender = true;
    },
    /**
     * @see this.selectClass for parameters
     */
    saveFilter(previewMode, widgetValue, params) {
        // TODO
        this.filterState.editing = false;
        this.rerender = true;
    },
    /**
     * @see this.selectClass for parameters
     */
    deleteFilter(previewMode, widgetValue, params) {
        // TODO
    },
    /**
     * @see this.selectClass for parameters
     */
    irFilter(previewMode, widgetValue, params) {
        console.log('irFilter', arguments);
    },
    /**
     * @see this.selectClass for parameters
     */
    selectField(previewMode, widgetValue, params) {
        this.filterState.fields[params.fieldLabel] = widgetValue;
    },
    /**
     * @see this.selectClass for parameters
     */
    filterName(previewMode, widgetValue, params) {
        this.filterState.name = widgetValue;
    },

    //--------------------------------------------------------------------------
    // Private
    //--------------------------------------------------------------------------

    /**
     * @override
     */
    async _renderCustomXML(uiFragment) {
        const retVal = await this._super(...arguments);
        const {editing} = this.filterState;
        if (editing) {
            const filterEdit = uiFragment.querySelector('[data-name=filter_customize_opt]');
            filterEdit.classList.remove('d-none');
            const fields = await this._getTemplateFields();
            Object.entries(fields).forEach(([label, possibleValues]) => {
                const fieldSelect = document.createElement('we-select');
                fieldSelect.setAttribute('string', label);
                fieldSelect.dataset.fieldName = label;
                // TODO: add support for optional fields.
                possibleValues.forEach(value => {
                    const option = document.createElement('we-button');
                    option.textContent = value;
                    option.dataset.selectField = value;
                    option.dataset.fieldLabel = label;
                    fieldSelect.appendChild(option);
                });
                filterEdit.appendChild(fieldSelect);
            });
        }
        return retVal;
    },
    /**
     * @override
     */
    _computeWidgetState(methodName, params) {
        if (methodName === 'irFilter') {
            return '';
        } else if (methodName === 'selectField') {
            return this.filterState.fields[params.fieldLabel] || '';
        } else if (methodName === 'filterName') {
            return this.filterState.name;
        }
        return this._super(...arguments);
    },
    /**
     * @override
     */
    _computeWidgetVisibility(optionName, params) {
        if (['filter_opt_select', 'filter_opt_edit', 'filter_opt_create'].includes(optionName)) {
            return !this.filterState.editing;
        }
        return this._super(...arguments);
    },
    /**
     * Returns the fields that the current template uses.
     * @private
     */
    async _getTemplateFields() {
        // TODO: make this work
        const {templateKey} = this.$target[0].dataset;
        const [templateFields] = await this._rpc({
            model: 'website.snippet.filter_template',
            method: 'search_read',
            args: [[['key', '=', templateKey]], ['fields']],
        });
        debugger;
        // this.filterState.name = 'Countries';
        // const templateFields = {
        //     Title: {
        //         selected: 'display_name',
        //         possible: ['name', 'display_name', 'description'],
        //     },
        //     Subtitle: {
        //         selected: 'display_name',
        //         possible: ['name', 'display_name', 'description'],
        //     },
        //     Description: {
        //         selected: 'display_name',
        //         possible: ['name', 'display_name', 'description'],
        //     },
        //     Picture: {
        //         selected: 'image_512',
        //         possible: ['image_512'],
        //     },
        // };
        // Object.entries(templateFields).forEach(([label, {selected, possible}]) => {
        //     this.filterState.fields[label] = selected;
        //     templateFields[label] = possible;
        // });
        return templateFields;
    },
    /**
     * Sets default options values.
     * Method to be overridden in child components in order to set additional
     * options default values.
     * @private
     */
    _setOptionsDefaultValues: function () {
        this._setOptionValue('numberOfElements', 4);
        this._setOptionValue('numberOfElementsSmallDevices', 1);
    },
    /**
     * Sets the option value.
     * @param optionName
     * @param value
     * @private
     */
    _setOptionValue: function (optionName, value) {
        if (this.$target.get(0).dataset[optionName] === undefined) {
            this.$target.get(0).dataset[optionName] = value;
        }
    },
});

options.registry.dynamic_snippet = dynamicSnippetOptions;

return dynamicSnippetOptions;
});

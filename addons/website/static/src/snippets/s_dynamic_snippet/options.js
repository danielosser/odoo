odoo.define('website.s_dynamic_snippet_options', function (require) {
'use strict';

const options = require('web_editor.snippets.options');

const dynamicSnippetOptions = options.Class.extend({

    /**
     *
     * @override
     */
    init: function () {
        this._super.apply(this, arguments);
        this.dynamicFilters = {};
        this.dynamicFilterTemplates = {};
    },
    /**
     *
     * @override
     */
    onBuilt: function () {
        this._setOptionsDefaultValues();
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

    //--------------------------------------------------------------------------
    // Private
    //--------------------------------------------------------------------------

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

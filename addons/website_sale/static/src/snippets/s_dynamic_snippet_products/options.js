odoo.define('website_sale.s_dynamic_snippet_products_options', function (require) {
'use strict';

const options = require('web_editor.snippets.options');
const s_dynamic_snippet_carousel_options = require('website.s_dynamic_snippet_carousel_options');

const dynamicSnippetProductsOptions = s_dynamic_snippet_carousel_options.extend({

    /**
     *
     * @override
     */
    init: function () {
        this._super.apply(this, arguments);
        this.productCategories = {};
    },
    /**
     *
     * @override
     */
    onBuilt: function () {
        this._super.apply(this, arguments);
        // TODO: can't this just be put in the template through an xpath? Or
        // make the snippet filter route accept an xml-id?
        this._rpc({
            model: 'ir.model.data',
            method: 'get_object_reference',
            args: ['website_sale', 'dynamic_filter_demo_products'],
        }).then(([, id]) => {
            this.$target[0].dataset.filterId = id;
            this.$target[0].dataset.numberOfRecords = 16;
        });
    },

    //--------------------------------------------------------------------------
    // Private
    //--------------------------------------------------------------------------

    /**
     *
     * @override
     * @private
     */
    _computeWidgetVisibility: function (widgetName, params) {
        if (widgetName.startsWith('filter_opt_')) {
            return false;
        }
        return this._super.apply(this, arguments);
    },
});

options.registry.dynamic_snippet_products = dynamicSnippetProductsOptions;

return dynamicSnippetProductsOptions;
});

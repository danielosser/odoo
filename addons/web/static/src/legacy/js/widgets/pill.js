odoo.define('web.pill', function (require) {
    'use strict';

    /**
     * This widget adds a pill on the top right side of the form
     *
     *      - You can specify a background color for the ribbon with the bg_color attribute
     *        using bootstrap classes :
     *        (bg-primary, bg-secondary, bg-success, bg-danger, bg-warning, bg-info,
     *        bg-light, bg-dark, bg-white)

     *        If you don't specify the bg_color attribute the bg-success class will be used
     *        by default.
     */

    var widgetRegistry = require('web.widget_registry');
    var Widget = require('web.Widget');

    var PillWidget = Widget.extend({
        template: 'web.pill',
        xmlDependencies: ['/web/static/src/legacy/xml/pill.xml'],

        /**
         * @param {Object} options
         * @param {string} options.attrs.title
         * @param {string} options.attrs.text same as title
         * @param {string} options.attrs.tooltip
         * @param {string} options.attrs.bg_color
         */
        init: function (parent, data, options) {
            this._super.apply(this, arguments);
            this.className = options.attrs.bg_color ? options.attrs.bg_color : 'bg-success';
        },
    });

    widgetRegistry.add('web_pill', PillWidget);

    return PillWidget;
});

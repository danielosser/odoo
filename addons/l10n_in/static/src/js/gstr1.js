odoo.define('l10n_in.gstr1', function (require) {
    'use strict';

    const core = require('web.core');
    const AbstractAction = require('web.AbstractAction');

    const QWeb = core.qweb;
    const _t = core._t;

    const gstrWidget = AbstractAction.extend({
        hasControlPanel: true,
        contentTemplate: 'GSTR1',

        init(parent, fields) {
            this.actionManager = parent;
            this.data = {
                filters: {
                    date: {},
                    journal: {},
                },
                sections: {
                    invoice_section: {
                        columns: [
                            { string: 'Type of Invoice' },
                            { string: 'Count of Documents' },
                            { string: 'Taxable Amount(A)' },
                            { string: 'Taxable Amount(B)' },
                            { string: 'Invoice Value', meta_string: '(Total of Previous Columns May Not Match(₹)'},
                        ],
                        rows: [
                            {
                                row_data: [
                                    { value: '<strong>B2B</strong> <span class="text-muted">(4A, 4B, 4C, 6B, 6C)</span>', type: 'html'},
                                    { value: 1 },
                                    { value: 100 },
                                    { value: 10 },
                                    { value: 11010 }
                                ],
                                row_domain: [[]],
                            }
                        ]
                    },
                    order_section: {
                        columns: [
                            { string: 'Type of Invoice' },
                            { string: 'Taxable Amount(A)(₹)' },
                            { string: 'Taxable Amount(B)(₹)' },
                            { string: 'Invoice Value', meta_string: '(Total of Previous Columns May Not Match(₹)' },
                        ],
                        rows: [
                            {
                                row_data: [
                                    { value: '<strong>B2B Others</strong> <span class="text-muted">(7)</span>', type: 'html' },
                                    { value: 1 },
                                    { value: 100 },
                                    { value: 10 },
                                    { value: 110 }
                                ],
                                row_domain: [[]],
                            }
                        ]
                    },
                    amendments_section: {
                        columns: [
                            { string: 'Type of Invoice' },
                            { string: 'Count of Documents' },
                            { string: 'Taxable Amount(A)(₹)' },
                            { string: 'Taxable Amount(B)(₹)' },
                            { string: 'Invoice Value' },
                        ],
                        rows: [
                            {
                                row_data: [
                                    { value: '<strong>B2B Amendments</strong> <span class="text-muted">(9A)</span>', type: 'html' },
                                    { value: 1 },
                                    { value: 100 },
                                    { value: 10 },
                                    { value: 110 }
                                ],
                                row_domain: [[]],
                            }
                        ]
                    },
                },
            };
            return this._super(...arguments);
        },
        willStart() {
            const prom = this._super(...arguments);
            return Promise.all([prom, this.generateSearchView()]);
        },
        start() {
            this.controlPanelProps.cp_content = {
                // $buttons: this.$buttons,
                $searchview_buttons: this.$searchview_buttons,
                // $pager: this.$pager,
                $searchview: this.$searchview,
            };
            return this._super(...arguments);
        },
        generateSearchView() {
            this.$searchview_buttons = $(QWeb.render("search_template", { widget: this }));
            return Promise.resolve();
        },
    });

    core.action_registry.add('account_report_gstr1', gstrWidget);
});

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
            this._super(...arguments);
            this.data = {
                filters: {
                    date: {},
                    journal: {},
                },
                sections: [{
                    columns: [
                        { name: 'Type of Invoice' },
                        { name: 'Count of Documents' },
                        { name: 'Taxable Amount(A)' },
                        { name: 'Taxable Amount(B)' },
                        { name: 'Invoice Value', name_details: '(Total of Previous Columns May Not Match(₹)'},
                        { button_name: 'view_edit' },
                    ],
                    rows: [
                        {
                            row_data: ['<strong>B2B</strong> <span class="text-muted">(4A, 4B, 4C, 6B, 6C)</span>', 1, 100, 10, 110, ],
                            row_domain: [[]],
                        }
                    ]
                }, {
                    columns: [],
                    rows: []
                }, {
                    columns: [],
                    rows: []
                }]
            };
        },
        async willStart() {
            await this.generateSearchView();
        },
        generateSearchView() {
            this.$searchview_buttons = QWeb.render("search_template", { widget: this });
        },
    });

    core.action_registry.add('account_report_gstr1', gstrWidget);
});

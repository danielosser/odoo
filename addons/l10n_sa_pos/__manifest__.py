# -*- coding: utf-8 -*-
# Part of Odoo. See LICENSE file for full copyright and licensing details.
{
    'name': 'K.S.A. - Point of Sale',
    'author': 'Odoo S.A',
    'category': 'Accounting/Localizations/Point of Sale',
    'description': """
K.S.A. POS Localization
=======================================================
    """,
    'license': 'LGPL-3',
    'depends': ['l10n_gcc_pos', 'l10n_sa_invoice'],
    'data': [
    ],
    'assets': {
        'web.assets_qweb': [
            'l10n_sa_pos/static/src/xml/OrderReceipt.xml',
        ],
        'point_of_sale.assets': [
            'l10n_sa_pos/static/src/lib/zxing.js',
            'l10n_sa_pos/static/src/js/OrderReceipt.js',
        ]
    },
    'auto_install': True,
}

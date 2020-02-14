# -*- coding: utf-8 -*-
# Part of Odoo. See LICENSE file for full copyright and licensing details.


{
    'name': 'Purchase and MRP Management',
    'version': '1.0',
    'category': 'Operations/Purchase',
    'description': """
This module provides facility to the user to install mrp and purchase modules at a time.
========================================================================================

It is basically used when we want to keep track of production orders generated
from purchase order.
    """,
    'data': [
        'views/purchase_order_views.xml',
        'views/mrp_production_views.xml'
    ],
    'depends': ['mrp', 'purchase_stock'],
    'installable': True,
    'auto_install': True,
    'post_init_hook': '_set_manufacture_mto_pull_rules_on_buy_route',
}

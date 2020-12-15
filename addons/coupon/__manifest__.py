# -*- coding: utf-8 -*-
# Part of Odoo. See LICENSE file for full copyright and licensing details.
{
    'name': "Coupon",
    'summary': "Use discount coupons in different sales channels.",
    'description': """Integrate coupon mechanism in orders.""",
    'category': 'Sales',
    'version': '1.0',
    'depends': ['account'],
    'data': [
        'data/ir_cron.xml',
        'security/ir.model.access.csv',
        'security/coupon_security.xml',
        'wizard/coupon_generate_views.xml',
        'views/assets.xml',
        'views/coupon_views.xml',
        'views/coupon_program_views.xml',
        'report/coupon_report.xml',
        'report/coupon_report_templates.xml',
    ],
    'demo': [
        'demo/coupon_demo.xml',
    ],
    'installable': True,
}

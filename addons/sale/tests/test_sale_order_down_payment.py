# -*- coding: utf-8 -*-
# Part of Odoo. See LICENSE file for full copyright and licensing details.
from datetime import timedelta
from freezegun import freeze_time

from odoo import fields
from odoo.exceptions import UserError, AccessError
from odoo.tests import tagged, Form
from odoo.tools import float_compare

from .common import TestSaleCommon


@tagged('post_install', '-at_install')
class TestSaleOrderDownPayment(TestSaleCommon):

    @classmethod
    def setUpClass(cls, chart_template_ref=None):
        super().setUpClass(chart_template_ref=chart_template_ref)

        SaleOrder = cls.env['sale.order'].with_context(tracking_disable=True)

        def create_tax(amount):
            return cls.env['account.tax'].create({
                'name': 'Tax %s' % amount,
                'amount_type': 'percent',
                'amount': amount,
                'type_tax_use': 'sale',
            })

        cls.tax_10 = create_tax(10)
        cls.tax_15 = create_tax(15)
        cls.tax_20 = create_tax(20)

        # create a generic Sale Order with all classical products and empty pricelist
        cls.sale_order = SaleOrder.create({
            'partner_id': cls.partner_a.id,
            'partner_invoice_id': cls.partner_a.id,
            'partner_shipping_id': cls.partner_a.id,
            'pricelist_id': cls.company_data['default_pricelist'].id,
        })
        cls.sol_product_order = cls.env['sale.order.line'].create({
            'name': cls.company_data['product_order_no'].name,
            'product_id': cls.company_data['product_order_no'].id,
            'product_uom_qty': 2,
            'product_uom': cls.company_data['product_order_no'].uom_id.id,
            'price_unit': 100,
            'order_id': cls.sale_order.id,
            'tax_id': False,
        })
        cls.sol_serv_deliver = cls.env['sale.order.line'].create({
            'name': cls.company_data['product_service_delivery'].name,
            'product_id': cls.company_data['product_service_delivery'].id,
            'product_uom_qty': 2,
            'product_uom': cls.company_data['product_service_delivery'].uom_id.id,
            'price_unit': 100,
            'order_id': cls.sale_order.id,
            'tax_id': False,
        })
        cls.sol_serv_order = cls.env['sale.order.line'].create({
            'name': cls.company_data['product_service_order'].name,
            'product_id': cls.company_data['product_service_order'].id,
            'product_uom_qty': 2,
            'product_uom': cls.company_data['product_service_order'].uom_id.id,
            'price_unit': 100,
            'order_id': cls.sale_order.id,
            'tax_id': False,
        })
        cls.sol_product_deliver = cls.env['sale.order.line'].create({
            'name': cls.company_data['product_delivery_no'].name,
            'product_id': cls.company_data['product_delivery_no'].id,
            'product_uom_qty': 2,
            'product_uom': cls.company_data['product_delivery_no'].uom_id.id,
            'price_unit': 100,
            'order_id': cls.sale_order.id,
            'tax_id': False,
        })

        cls.account_revenue = cls.company_data['default_account_revenue']
        cls.receivable_account = cls.company_data['default_account_receivable']

    def make_downpayment(self):
        so_context = {
            'active_model': 'sale.order',
            'active_ids': [self.sale_order.id],
            'active_id': self.sale_order.id,
            'default_journal_id': self.company_data['default_journal_sale'].id,
        }
        downpayment = self.env['sale.advance.payment.inv'].with_context(so_context).create({
            'advance_payment_method': 'percentage',
            'amount': 50,
            'deposit_account_id': self.account_revenue.id
        })
        downpayment
        downpayment.create_invoices()
        self.sale_order.action_confirm()

    def test_tax_brakedown(self):
        self.sale_order.order_line[0].tax_id = self.tax_15 + self.tax_10
        self.sale_order.order_line[1].tax_id = self.tax_10
        self.sale_order.order_line[2].tax_id = self.tax_10
        self.make_downpayment()
        invoice = self.sale_order.invoice_ids
        down_pay_lines = self.sale_order.order_line.filtered(lambda x: x.is_downpayment)
        self.assertRecordValues(invoice.line_ids, [
            # base lines
            {'account_id': self.account_revenue.id,    'tax_ids': (self.tax_15 + self.tax_10).ids, 'price_total': 125  },
            {'account_id': self.account_revenue.id,    'tax_ids': self.tax_10.ids,                 'price_total': 220  },
            {'account_id': self.account_revenue.id,    'tax_ids': self.env['account.tax'],         'price_total': 100  },
            # taxes
            {'account_id': self.account_revenue.id,    'tax_ids': self.env['account.tax'],         'price_total': 15   },
            {'account_id': self.account_revenue.id,    'tax_ids': self.env['account.tax'],         'price_total': 30   },
            # receivable
            {'account_id': self.receivable_account.id, 'tax_ids': self.env['account.tax'],         'price_total': -445 },
        ])
        down_pay_lines
        pass
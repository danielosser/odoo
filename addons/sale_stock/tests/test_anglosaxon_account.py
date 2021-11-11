# -*- coding: utf-8 -*-
from odoo.addons.account.tests.account_test_savepoint import AccountTestInvoicingCommon
from odoo.tests import tagged

@tagged('post_install', '-at_install')
class TestAngloSaxonAccounting(AccountTestInvoicingCommon):

    @classmethod
    def setUpClass(cls):
        super().setUpClass()
        cls.company_data['company'].write({
            'anglo_saxon_accounting': True
        })
        cls.company_data_2['company'].write({
            'anglo_saxon_accounting': True
        })
        product_category = cls.env['product.category'].create({
            'name': 'a random storable product category',
            'property_cost_method': 'fifo',
            'property_valuation': 'real_time',
        })
        cls.storable_product = cls.env['product.product'].create({
            'name': 'storable product a',
            'type': 'product',
            'categ_id': product_category.id,
        })
        # Those values are company dependent and need to be explicitly set for both companies
        cls.env.user.company_id = cls.company_data_2['company'].id
        product_category.write({
            'property_cost_method': 'fifo',
            'property_valuation': 'real_time',
        })
        cls.env.user.company_id = cls.company_data['company'].id


    def test_cogs_should_use_price_from_the_right_company(self):
        """
        Reproduce the flow of creating an invoice from a sale order with a company B
        and posting the invoice with both companies selected and company A as the main.
        """
        company_a_data = self.company_data
        company_b_data = self.company_data_2
        product = self.storable_product

        # set different cost price for the same product in the 2 companies
        self.env.user.company_id = company_a_data['company'].id
        company_a_standard_price = 20.0
        product.write({'standard_price': company_a_standard_price})
        self.env.user.company_id = company_b_data['company'].id
        company_b_standard_price = 10.0
        product.write({'standard_price': company_b_standard_price})

        # create sale order with company b in draft
        partner_id = self.env['res.partner'].search([], limit=1)  # it doesn't matter which partner
        company_b_order = self.env['sale.order'].create({
            'name': 'testing sale order',
            'partner_id': partner_id.id,
            'order_line': [
                (0, 0, {
                    'name': 'product storable product a',
                    'product_id': product.id,
                    'product_uom_qty': 1,
                    'product_uom': product.uom_id.id,
                    'price_unit': 40.0,
                })
            ],
        })
        company_b_order.action_confirm()

        # Create an invoice from the sale order using the sale wizard
        self.env['sale.advance.payment.inv'].with_context({
            'active_model': 'sale.order',
            'active_ids': [company_b_order.id],
            'active_id': company_b_order.id,
            'default_journal_id': company_b_data['default_journal_sale'].id
        }).create({
            'advance_payment_method': 'delivered'
        }).create_invoices()
        company_b_invoice = company_b_order.invoice_ids

        # Post the invoice from company B with company A
        self.env.user.company_id = company_a_data['company'].id
        company_b_invoice.post()

        # check cost used it the cost from company b
        anglo_saxon_lines = company_b_invoice.line_ids.filtered('is_anglo_saxon_line')
        cost_used = sorted(anglo_saxon_lines.mapped('balance'))
        self.assertEqual(cost_used[0], -company_b_standard_price)
        self.assertEqual(cost_used[1], company_b_standard_price)

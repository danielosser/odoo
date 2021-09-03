# -*- coding: utf-8 -*-
# Part of Odoo. See LICENSE file for full copyright and licensing details.

from odoo.addons.crm.tests import common as crm_common
from odoo.tests.common import Form


class TestLeadToQuotation(crm_common.TestCrmCases):

    def test_sale_quotation_from_crm_lead(self):
        # Test that correct sales person and team on quotation is set when created from lead

        CrmLead = self.env['crm.lead']
        partner_1 = self.env['res.partner'].create({
            'name': 'Partner 1',
            'email': 'partner@other.company.com'
        })
        partner_2 = self.env['res.partner'].create({
            'name': 'Partner 2',
            'email': 'supplier@other.company.com',
            'user_id': self.crm_salemanager.id,
        })
        team = self.env['crm.team'].with_user(self.crm_salemanager).create({'name': "Europe Marketing Team"})

        # Check that if lead has a salesperson and lead contact also has a salesperson, lead's
        # salesperson should be set as a quotation's salesperson (instead of one linked 
        # with lead contact) while creating quotation.
        lead_without_salesperson_1 = CrmLead.create({
            'name': 'Lead 1',
            'partner_id': partner_2.id,
            'user_id': False
        })
        action_ctx = lead_without_salesperson_1.action_new_quotation().get('context', {})
        quotation_1 = Form(self.env['sale.order'].with_context(action_ctx)).save()
        self.assertEqual(
            quotation_1.user_id, partner_2.user_id,
            'quotation should have the same salesperson as lead'
        )
        # checks quotation should have the same sales team as lead
        self.assertEqual(
            quotation_1.team_id, lead_without_salesperson_1.team_id,
            'quotation should have the same sales team as lead'
        )

        # Check that if lead is missing a salesperson and partner has already assigned salesperson,
        # then it should be set as a quotation salesperson while converting lead to quotation.
        lead_without_salesperson_2 = CrmLead.create({
            'name': 'Lead 2',
            'partner_id': partner_1.id,
            'user_id': False
        })
        action_ctx = lead_without_salesperson_2.action_new_quotation().get('context', {})
        quotation_2 = Form(self.env['sale.order'].with_context(action_ctx)).save()
        self.assertEqual(
            quotation_2.user_id, self.env.user,
            'quotation should have the same salesperson as lead'
        )

        # Check that if lead has a salesperson, it should be set as quotation salesperson
        # instead of logged in user while converting lead to quotation.
        lead_with_salesperson_1 = CrmLead.create({
            'name': 'Lead 3',
            'partner_id': partner_1.id,
            'user_id': self.crm_salesman.id,
            'team_id': team.id,
        })
        action_ctx = lead_with_salesperson_1.action_new_quotation().get('context', {})
        quotation_3 = Form(self.env['sale.order'].with_context(action_ctx)).save()
        self.assertEqual(
            quotation_3.user_id, lead_with_salesperson_1.user_id,
            'quotation should have the same salesperson as lead'
        )
        # checks quotation should have the same sales team as lead
        self.assertEqual(
            quotation_3.team_id, lead_with_salesperson_1.team_id,
            'quotation should have the same sales team as lead'
        )

        # Check that if lead has a salesperson and lead contact also has a salesperson, lead's
        # salesperson should be set as a quotation's salesperson (instead of one linked 
        # with lead contact) while creating quotation.
        lead_without_salesperson_3 = CrmLead.create({
            'name': 'Lead 4',
            'partner_id': partner_2.id,
            'user_id': False
        })
        action_ctx = lead_without_salesperson_3.action_view_sale_quotation().get('context', {})
        quotation_4 = Form(self.env['sale.order'].with_context(action_ctx)).save()
        self.assertEqual(
            quotation_4.user_id, partner_2.user_id,
            'quotation should have the same salesperson as lead'
        )
        # checks quotation should have the same sales team as lead
        self.assertEqual(
            quotation_4.team_id, lead_without_salesperson_3.team_id,
            'quotation should have the same sales team as lead'
        )

        # Check that if lead is missing a salesperson, logged in users should be set as
        # a quotation salesperson while converting lead to quotation.
        lead_without_salesperson_4 = CrmLead.create({
            'name': 'Lead 5',
            'partner_id': partner_1.id,
            'user_id': False
        })
        action_ctx = lead_without_salesperson_4.action_view_sale_quotation().get('context', {})
        quotation_5 = Form(self.env['sale.order'].with_context(action_ctx)).save()
        self.assertEqual(
            quotation_5.user_id, self.env.user,
            'quotation should have the same salesperson as lead'
        )

        # Check that if lead has a salesperson, it should be set as quotation salesperson
        # instead of logged in user while converting lead to quotation.
        lead_with_salesperson_2 = CrmLead.create({
            'name': 'Lead 6',
            'partner_id': partner_1.id,
            'user_id': self.crm_salesman.id
        })
        action_ctx = lead_with_salesperson_2.action_view_sale_quotation().get('context', {})
        quotation_6 = Form(self.env['sale.order'].with_context(action_ctx)).save()
        self.assertEqual(
            quotation_6.user_id, lead_with_salesperson_2.user_id,
            'quotation should have the same salesperson as lead'
        )

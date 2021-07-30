# -*- coding: utf-8 -*-
# Part of Odoo. See LICENSE file for full copyright and licensing details.

from odoo.tests.common import TransactionCase
from odoo.tests import common, tagged


@tagged('res_partner')
class TestPartner(TransactionCase):

    def test_email_formatted(self):
        new_partner = self.env['res.partner'].create({
            'name': "Vlad the Impaler",
            'email': 'vlad.the.impaler@example.com'
        })
        self.assertEqual(
            new_partner.email_formatted, '"Vlad the Impaler" <vlad.the.impaler@example.com>',
            'Email formatted should be name <email>'
        )

        # test name_creat
        new_partner_id = self.env['res.partner'].name_create('Balázs <vlad.the.impaler@example.com>')[0]
        new_partner = self.env['res.partner'].browse(new_partner_id)
        self.assertEqual(new_partner.name, "Balázs")
        self.assertEqual(new_partner.email, "vlad.the.impaler@example.com")
        self.assertEqual(
            new_partner.email_formatted, '"Balázs" <vlad.the.impaler@example.com>',
            'Name_create should correctly compute name / email'
        )

        # check name / email updates
        new_partner.write({'name': 'Vlad the Impaler'})
        self.assertEqual(new_partner.email_formatted, '"Vlad the Impaler" <vlad.the.impaler@example.com>')
        new_partner.write({'name': 'Balázs'})
        self.assertEqual(new_partner.email_formatted, '"Balázs" <vlad.the.impaler@example.com>')
        new_partner.write({'email': "Vlad the Impaler <vlad.the.impaler@example.com>"})
        self.assertEqual(new_partner.email_formatted, '"Balázs" <vlad.the.impaler@example.com>')
        new_partner.write({'email': 'Balázs <balazs@adam.hu>'})
        self.assertEqual(new_partner.email_formatted, '"Balázs" <balazs@adam.hu>')

        # check multi emails
        new_partner.write({'email': 'vlad.the.impaler@example.com, vlad.the.dragon@example.com'})
        self.assertEqual(new_partner.email_formatted, '"Balázs" <vlad.the.impaler@example.com>')

        # check false emails
        new_partner.write({'email': 'notanemail'})
        self.assertEqual(new_partner.email_formatted, '"Balázs" <notanemail>',
                         'Email formatted should keep wrong emails as it helps debugging / having information in mails, notifications and traces')

    def test_name_search(self):
        """ Check name_search on partner, especially with domain based on auto_join
        user_ids field. Check specific SQL of name_search correctly handle joined tables. """
        test_partner = self.env['res.partner'].create({'name': 'Vlad the Impaler'})
        test_user = self.env['res.users'].create({'name': 'Vlad the Impaler', 'login': 'vlad', 'email': 'vlad.the.impaler@example.com'})

        ns_res = self.env['res.partner'].name_search('Vlad', operator='ilike')
        self.assertEqual(set(i[0] for i in ns_res), set((test_partner | test_user.partner_id).ids))

        ns_res = self.env['res.partner'].name_search('Vlad', args=[('user_ids.email', 'ilike', 'vlad')])
        self.assertEqual(set(i[0] for i in ns_res), set(test_user.partner_id.ids))

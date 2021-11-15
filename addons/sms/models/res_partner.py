# -*- coding: utf-8 -*-
# Part of Odoo. See LICENSE file for full copyright and licensing details.

from odoo import models


class ResPartner(models.Model):
    _name = 'res.partner'
    _inherit = ['res.partner', 'mail.thread.phone']

    def _sms_get_default_partners(self):
        """ Override of mail.thread method.
            SMS recipients on partners are the partners themselves.
        """
        return self

    def _phone_get_number_fields(self):
        """ This method returns the fields to use to find the number to use to
        send an SMS on a record. """
        return ['mobile', 'phone']

    def action_send_sms(self, args):
        self.ensure_one()
        temp_body = args['temp']._render_field('body', args['res_ids'])[args['res_id']]
        composer = self.env['sms.composer'].with_context(
            default_res_model=self._name,
            default_res_id=args['partner_id'],
            default_composition_mode='comment',
            default_body=temp_body,
        ).create({})
        return composer.action_send_sms()

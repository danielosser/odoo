# -*- coding: utf-8 -*-
# Part of Odoo. See LICENSE file for full copyright and licensing details.

from odoo import api, models


class SMSTemplate(models.Model):
    "Templates for sending SMS"
    _inherit = 'sms.template'

    @api.model
    def default_get(self, fields):
        res = super(SMSTemplate, self).default_get(fields)
        res['model_id'] = self.env['ir.model']._get('project.task').id
        return res

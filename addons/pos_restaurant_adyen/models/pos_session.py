# -*- coding: utf-8 -*-
# Part of Odoo. See LICENSE file for full copyright and licensing details.

from odoo import models


class PosSession(models.Model):
    _inherit = 'pos.session'

    def _loader_params_pos_payment_method(self):
        meta = super()._loader_params_pos_payment_method()
        meta['fields'].append('adyen_merchant_account')
        return meta

# -*- coding: utf-8 -*-
# Part of Odoo. See LICENSE file for full copyright and licensing details.

from odoo import fields, models


class SaleOrder(models.Model):
    _inherit = 'sale.order'

    tag_ids = fields.Many2many('crm.lead.tag', 'sale_order_tag_rel', 'order_id', 'tag_id', string='Tags')

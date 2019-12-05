# -*- coding: utf-8 -*-
# Part of Odoo. See LICENSE file for full copyright and licensing details.

from odoo import api, models


class SaleOrderLine(models.Model):
    _inherit = 'sale.order.line'

    def _purchase_price_depends(self):
        return super()._purchase_price_depends() + ['move_ids', 'move_ids.stock_valuation_layer_ids', 'order_id.picking_ids.state']

    @api.depends(lambda self: self._purchase_price_depends())
    def _compute_purchase_price(self):
        lines_without_moves = self.browse()
        for line in self:
            if not line.move_ids:
                lines_without_moves |= line
            else:
                line.purchase_price = line.product_id._compute_average_price(0, line.product_uom_qty, line.move_ids)
        return super(SaleOrderLine, lines_without_moves)._compute_purchase_price()

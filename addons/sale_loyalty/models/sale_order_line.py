# -*- coding: utf-8 -*-
# Part of Odoo. See LICENSE file for full copyright and licensing details.

from collections import defaultdict

from odoo import api, fields, models

class SaleOrderLine(models.Model):
    _inherit = "sale.order.line"

    #NOTE: stored for legacy purpose
    # TODO: try to remove stored
    is_reward_line = fields.Boolean('Is a program reward line', compute='_compute_is_reward_line', store=True)
    # TODO: maybe contraint on both null or both non null
    reward_id = fields.Many2one('loyalty.reward', ondelete='restrict', readonly=True)
    coupon_id = fields.Many2one('loyalty.card', ondelete='restrict', readonly=True)
    # This will be used to delete multiple lines related to the same reward
    # While we can fetch other lines using the reward and coupon_id this means we will delete
    # All rewards if an order has multiple rewards of the same type with the same coupon
    # (example: loyalty card with free product)
    reward_identifier_code = fields.Char()
    points_cost = fields.Float(help='How much point this reward cost on the loyalty card.')

    @api.depends('reward_id')
    def _compute_is_reward_line(self):
        for line in self:
            line.is_reward_line = bool(line.reward_id)

    def _is_not_sellable_line(self):
        return self.is_reward_line or super()._is_not_sellable_line()

    def unlink(self):
        # Remove programs for 'current' types
        for line in self:
            if line.reward_id.program_id.applies_on == 'current':
                line.order_id._remove_program_from_points(line.reward_id.program_id)
        # Remove related reward lines
        reward_coupon_set = {(l.reward_id, l.coupon_id, l.reward_identifier_code) for l in self if l.reward_id}
        related_lines = self.env['sale.order.line']
        for order in self.order_id:
            related_lines |= order.order_line.filtered(lambda l: (l.reward_id, l.coupon_id, l.reward_identifier_code) in reward_coupon_set)
        # Give back the points if the order is confirmed, points are given back if the order is cancelled but in this case we need to do it directly
        for line in related_lines:
            if line.order_id.state in ('sale', 'done'):
                line.coupon_id.points += line.points_cost
        return super(SaleOrderLine, self | related_lines).unlink()

    def _compute_tax_id(self):
        reward_lines = self.filtered('is_reward_line')
        super(SaleOrderLine, self - reward_lines)._compute_tax_id()
        # Discount reward line is split per tax, the discount is set on the line but not on the product
        # as the product is the generic discount line.
        # In case of a free product, retrieving the tax on the line instead of the product won't affect the behavior.
        for line in reward_lines:
            line = line.with_company(line.company_id)
            fpos = line.order_id.fiscal_position_id or line.order_id.fiscal_position_id.get_fiscal_position(line.order_partner_id.id)
            # If company_id is set, always filter taxes by the company
            taxes = line.tax_id.filtered(lambda r: not line.company_id or r.company_id == line.company_id)
            line.tax_id = fpos.map_tax(taxes)

    def _get_display_price(self, product):
        # A product created from a promotion does not have a list_price.
        # The price_unit of a reward order line is computed by the promotion, so it can be used directly
        if self.is_reward_line:
            return self.price_unit
        return super()._get_display_price(product)

    # Invalidation of `coupon.program.order_count`
    # `test_program_rules_validity_dates_and_uses`,
    # Overriding modified is quite hardcore as you need to know how works the cache and the invalidation system,
    # but at least the below works and should be efficient.
    # Another possibility is to add on product.product a one2many to sale.order.line 'order_line_ids',
    # and then add the depends @api.depends('discount_line_product_id.order_line_ids'),
    # but I am not sure this will as efficient as the below.
    def modified(self, fnames, *args, **kwargs):
        super(SaleOrderLine, self).modified(fnames, *args, **kwargs)
        if 'product_id' in fnames:
            Program = self.env['loyalty.program'].sudo()
            field_order_count = Program._fields['order_count']
            field_total_order_count = Program._fields['total_order_count']
            programs = self.env.cache.get_records(Program, field_order_count)
            programs |= self.env.cache.get_records(Program, field_total_order_count)
            if programs:
                products = self.filtered('is_reward_line').mapped('product_id')
                for program in programs:
                    if program.reward_ids.discount_line_product_id & products:
                        self.env.cache.invalidate([(field_order_count, program.ids), (field_total_order_count, program.ids)])

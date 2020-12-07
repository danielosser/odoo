# -*- coding: utf-8 -*-
# Part of Odoo. See LICENSE file for full copyright and licensing details.

from odoo import fields, models


# TODO: [XBO] merge with account.analytic.line in the sale_timesheet module in master.
class AccountAnalyticLine(models.Model):
    _inherit = 'account.analytic.line'

    is_so_line_edited = fields.Boolean()

    def _compute_so_line(self):
        super(AccountAnalyticLine, self.filtered(lambda t: not t.is_so_line_edited))._compute_so_line()

    def _check_sale_line_in_project_map(self):
        # TODO: [XBO] remove me in master, now we authorize to manually edit the so_line, then this so_line can be different of the one in task/project/map_entry
        # !!! Override of the method in sale_timesheet !!!
        return

# -*- coding: utf-8 -*-
# Part of Odoo. See LICENSE file for full copyright and licensing details.

from odoo import models, fields, api, _


class AccountMove(models.Model):
    _inherit = 'account.move'

    def _post(self, soft=True):
        vendor_bill_service = self.env.ref('account_fleet.data_fleet_service_type_vendor_bill', raise_if_not_found=False)
        if not vendor_bill_service:
            return super()._post(soft)

        val_list = []
        log_list = []
        not_posted_before = self.filtered(lambda r: not r.posted_before)
        posted = super()._post(soft)  # We need the move name to be set, but we also need to know which move are posted for the first time.
        for line in (not_posted_before & posted).line_ids.filtered(lambda ml: ml.vehicle_id and ml.move_id.move_type == 'in_invoice'):
            val = {
                'service_type_id': vendor_bill_service.id,
                'vehicle_id': line.vehicle_id.id,
                'amount': line.price_subtotal,
                'vendor_id': line.partner_id.id,
                'description': line.name,
            }
            log = _('Service Vendor Bill: <a href=# data-oe-model=account.move data-oe-id={move_id}>{move_name}</a>').format(
                move_id=line.move_id.id,
                move_name=line.move_id.name,
            )
            val = self._handle_non_deductible_taxes(line, val)
            if val:
                val_list.append(val)
                log_list.append(log)
        log_service_ids = self.env['fleet.vehicle.log.services'].create(val_list)
        for log_service_id, log in zip(log_service_ids, log_list):
            log_service_id.message_post(body=log)
        return posted

    def _handle_non_deductible_taxes(self, move_line, val):
        non_deductible_tax_ids = move_line.tax_ids.mapped('invoice_repartition_line_ids').filtered(
            lambda l: l.repartition_type == 'tax' and not l.use_in_tax_closing).tax_id

        if non_deductible_tax_ids:
            for line in move_line.move_id.line_ids:
                if line.tax_line_id in non_deductible_tax_ids and line.account_id.create_asset != 'no':
                    tax_details_query, tax_details_params = move_line._get_query_tax_details_from_domain([('id', '=', line.id)])
                    self._cr.execute(tax_details_query, tax_details_params)
                    for row in self._cr.dictfetchall():
                        if move_line.id == row['base_line_id']:
                            val.update({
                                'amount': row['base_amount_currency'] + row['tax_amount_currency'],
                            })
        elif move_line.tax_line_id:
            val = None

        return val


    @api.model
    def _get_tax_grouping_key_from_tax_line(self, tax_line):
        # Overridden in order to group taxes that are related to the same vehicle_id
        res = super()._get_tax_grouping_key_from_tax_line(tax_line)
        res.update({
            'vehicle_id': tax_line.vehicle_id.id,
        })
        return res

    @api.model
    def _get_tax_grouping_key_from_base_line(self, base_line, tax_vals):
        # Overridden in order to group taxes that are related to the same vehicle_id
        res = super()._get_tax_grouping_key_from_base_line(base_line, tax_vals)
        res.update({
            'vehicle_id': base_line.vehicle_id.id,
        })
        return res


class AccountMoveLine(models.Model):
    _inherit = 'account.move.line'

    vehicle_id = fields.Many2one('fleet.vehicle', string='Vehicle')
    need_vehicle = fields.Boolean(compute='_compute_need_vehicle',
        help="Technical field to decide whether the vehicle_id field is editable")

    def _compute_need_vehicle(self):
        self.need_vehicle = False

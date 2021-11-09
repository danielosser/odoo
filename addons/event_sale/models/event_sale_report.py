# -*- coding: utf-8 -*-
# Part of Odoo. See LICENSE file for full copyright and licensing details.

from odoo import fields, models, tools

class EventSaleReport(models.Model):
    _name = 'event.sale.report'
    _description = 'Sales Analysis Report of the events'
    _auto = False
    _rec_name = 'id'

    event_ids = fields.Many2one('event.event', readonly=True)
    sale_price_subtotal = fields.Monetary('Total', readonly=True)
    currency_id = fields.Many2one('res.currency', readonly=True)
    event_type_ticket_ids = fields.Many2one('event.type.ticket', readonly=True)

    def init(self):
        tools.drop_view_if_exists(self._cr, self._table)
        self._cr.execute('CREATE OR REPLACE VIEW %s AS (%s);' % (self._table, self._query()))

    def _query(self):
        return """
            WITH event_sale AS (
                SELECT
                    sale_order_line.event_id as event_id,
                    SUM(sale_order_line.price_subtotal) as sale_price_subtotal,
                    sale_order_line.currency_id as currency_id
                FROM sale_order_line
                WHERE sale_order_line.event_id IS NOT NULL
                GROUP BY sale_order_line.event_id, sale_order_line.currency_id
            )
            SELECT
                ROW_NUMBER() OVER (ORDER BY event_sale.event_id, event_sale.currency_id) as id,
                event_event.id AS event_ids,
                COALESCE(event_sale.sale_price_subtotal, 0) AS sale_price_subtotal,
                event_sale.currency_id AS currency_id,
                event_type_ticket.id AS event_type_ticket_ids
            FROM event_sale
            LEFT JOIN event_event ON event_event.id = event_sale.event_id
            LEFT JOIN event_type ON event_type.id = event_event.event_type_id
            LEFT JOIN event_type_ticket ON event_type_ticket.event_type_id = event_type.id
        """

# -*- coding: utf-8 -*-
# Part of Odoo. See LICENSE file for full copyright and licensing details.

from odoo import api, models, fields


class EventConfigurator(models.TransientModel):
    _name = 'event.event.configurator'
    _description = 'Event Configurator'

    product_id = fields.Many2one('product.product', string="Product", readonly=True)
    event_id = fields.Many2one('event.event', string="Event")
    available_event_ticket_ids = fields.Many2many(
        'event.event.ticket', string='Available Event Tickets',
        compute='_compute_available_event_ticket_ids')
    event_ticket_id = fields.Many2one(
        'event.event.ticket', string="Event Ticket",
        domain=['id', 'in', available_event_ticket_ids])

    @api.depends('event_id')
    def _compute_available_event_ticket_ids(self):
        for record in self:
            record.available_event_ticket_ids = record.event_id.available_event_ticket_ids

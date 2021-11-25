# -*- coding: utf-8 -*-
# Part of Odoo. See LICENSE file for full copyright and licensing details.

from odoo import models
from odoo.tools import populate


class ResourceCalendar(models.Model):
    _inherit = "resource.calendar"

    _populate_dependencies = [
        'res.company',  # MC setup
    ]

    _populate_sizes = {
        'small': 5,  # 1 per company
        'medium': 20,  # 3 per company
        'large': 100  # 5 per company ?
    }

    def _populate_factories(self):
        company_ids = self.env.registry.populated_models['res.company']

        return [
            ("company_id", populate.iterate(company_ids)),
            ("name", populate.iterate(
                ["A little {counter}", "A lot {counter}"])),
        ]

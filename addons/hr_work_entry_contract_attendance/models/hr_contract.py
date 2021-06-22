# -*- coding: utf-8 -*-
# Part of Odoo. See LICENSE file for full copyright and licensing details.

from collections import defaultdict
import pytz

from odoo import fields, models
from odoo.addons.resource.models.resource import Intervals

class HrContract(models.Model):
    _inherit = 'hr.contract'

    work_entry_source = fields.Selection(
        selection_add=[('attendance', 'Attendances')],
        ondelete={'attendance': 'set default'},
    )

    def _get_attendance_intervals(self, start_dt, end_dt, tz):
        attendance_based_contracts = self.filtered(lambda c: c.work_entry_source == 'attendance')
        search_domain = [
            ('employee_id', 'in', attendance_based_contracts.employee_id.ids),
            ('check_in', '<', end_dt),
            ('check_out', '>', start_dt), #We ignore attendances which don't have a check_out
        ]
        resources = attendance_based_contracts.employee_id.resource_id.ids
        attendances = self.env['hr.attendance'].sudo().search(search_domain)
        intervals = defaultdict(list)
        for attendance in attendances:
            intervals[attendance.employee_id.resource_id.id].append((
                pytz.utc.localize(attendance.check_in),
                pytz.utc.localize(attendance.check_out),
                attendance))
        mapped_intervals = {r: Intervals(intervals[r]) for r in resources}
        mapped_intervals.update(super(HrContract, self - attendance_based_contracts)._get_attendance_intervals(
            start_dt, end_dt, tz))
        return mapped_intervals

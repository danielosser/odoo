# -*- coding: utf-8 -*-
# Part of Odoo. See LICENSE file for full copyright and licensing details.

from odoo import models

class ResUsers(models.Model):
    _inherit = 'res.users'

    def _create_recruitment_interviewers(self):
        interviewer_group = self.env.ref('hr_recruitment.group_hr_recruitment_interviewer', raise_if_not_found=False)
        if not interviewer_group or not self:
            return

        recruitment_groups = self.env.ref('hr_recruitment.group_hr_recruitment_user', raise_if_not_found=False) | self.env.ref('hr_recruitment.group_hr_recruitment_manager', raise_if_not_found=False)
        interviewer_group.sudo().write({
            'users': [
                (4, user.id) for user in self - recruitment_groups.users
            ]
        })

    def _remove_recruitment_interviewers(self):
        interviewer_group = self.env.ref('hr_recruitment.group_hr_recruitment_interviewer', raise_if_not_found=False)
        if not interviewer_group or not self:
            return

        all_interviewers = self.env['hr.job'].read_group([('interviewer_ids', 'in', self.ids)], ['interviewer_ids'], ['interviewer_ids'])
        all_interviewers += self.env['hr.applicant'].read_group([('interviewer_ids', 'in', self.ids)], ['interviewer_ids'], ['interviewer_ids'])
        user_ids = {x['interviewer_ids'][0] for x in all_interviewers}

        recruitment_groups = self.env.ref('hr_recruitment.group_hr_recruitment_user', raise_if_not_found=False) | self.env.ref('hr_recruitment.group_hr_recruitment_manager', raise_if_not_found=False)
        users_to_remove = set(self.ids) - (user_ids | set(recruitment_groups.users.ids))
        interviewer_group.sudo().write({
            'users': [
                (3, user_id) for user_id in users_to_remove
            ]
        })

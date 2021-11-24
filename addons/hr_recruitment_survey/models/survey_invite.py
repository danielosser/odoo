# Part of Odoo. See LICENSE file for full copyright and licensing details.

from odoo import fields, models, _
from odoo.tools.misc import clean_context


class SurveyInvite(models.TransientModel):
    _inherit = "survey.invite"

    applicant_id = fields.Many2one('hr.applicant', string='Applicant')

    def action_invite(self):
        self.ensure_one()
        if self.applicant_id:
            survey = self.survey_id.with_context(clean_context(self.env.context))
            if not self.applicant_id.response_id:
                self.applicant_id.write({
                    'response_id': survey._create_answer(partner=self.applicant_id.partner_id).id
                })
            body = _('<p>The survey <a href="#" data-oe-model="%(survey_app_name)s" data-oe-id="%(survey_id)s">%(survey_title)s</a> has been sent to '
                    '<a href="#" data-oe-model="%(partner_app_name)s" data-oe-id="%(partner_id)s">%(partner_name)s</a>.',
                     survey_app_name = survey._name,
                     survey_id = survey.id,
                     survey_title = survey.title,
                     partner_app_name = self.applicant_id.partner_id._name,
                     partner_id = self.applicant_id.partner_id.id,
                     partner_name = self.applicant_id.partner_id.name
                     )
            self.applicant_id.message_post(body=body)
        return super().action_invite()


class SurveyUserInput(models.Model):
    _inherit = "survey.user_input"

    applicant_id = fields.One2many('hr.applicant', 'response_id', string='Applicant')

    def _mark_done(self):
        odoobot = self.env.ref('base.partner_root')
        for user_input in self:
            if user_input.applicant_id:
                body = _('The applicant "%s" has finished the survey.', user_input.applicant_id.partner_name)
                user_input.applicant_id.message_post(body=body, author_id=odoobot.id)
        return super()._mark_done()

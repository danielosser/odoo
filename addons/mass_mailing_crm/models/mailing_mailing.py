# -*- coding: utf-8 -*-
# Part of Odoo. See LICENSE file for full copyright and licensing details.


from markupsafe import Markup
from odoo import api, fields, models, _, tools


class MassMailing(models.Model):
    _name = 'mailing.mailing'
    _inherit = 'mailing.mailing'

    use_leads = fields.Boolean('Use Leads', compute='_compute_use_leads')
    crm_lead_count = fields.Integer('Leads/Opportunities Count', compute='_compute_crm_lead_count')

    def _compute_use_leads(self):
        self.use_leads = self.env.user.has_group('crm.group_use_lead')

    def _compute_crm_lead_count(self):
        lead_data = self.env['crm.lead'].with_context(active_test=False).sudo().read_group(
            [('source_id', 'in', self.source_id.ids)],
            ['source_id'], ['source_id'],
        )
        mapped_data = {datum['source_id'][0]: datum['source_id_count'] for datum in lead_data}
        for mass_mailing in self:
            mass_mailing.crm_lead_count = mapped_data.get(mass_mailing.source_id.id, 0)

    def action_redirect_to_leads_and_opportunities(self):
        text = _("Leads") if self.use_leads else _("Opportunities")
        helper_header = _("No %s yet!", text)
        helper_message = _("Note that Odoo cannot track replies if they are sent towards email addresses to this database.")
        return {
            'context': {
                'active_test': False,
                'create': False,
                'search_default_group_by_create_date_day': True,
                'crm_lead_view_hide_month': True,
            },
            'domain': [('source_id', 'in', self.source_id.ids)],
            'help': Markup('<p class="o_view_nocontent_smiling_face">%s</p><p>%s</p>') % (
                helper_header, helper_message,
            ),
            'name': _("Leads Analysis"),
            'res_model': 'crm.lead',
            'type': 'ir.actions.act_window',
            'view_mode': 'graph,pivot,tree,form',
        }

    def _prepare_statistics_email_values(self):
        self.ensure_one()
        values = super(MassMailing, self)._prepare_statistics_email_values()
        if not self.user_id:
            return values
        values['kpi_data'][1]['kpi_col1'] = {
            'value': tools.format_decimalized_number(self.crm_lead_count, decimal=0),
            'col_subtitle': _('LEADS'),
        }
        values['kpi_data'][1]['kpi_name'] = 'lead'
        return values

    @api.model
    def default_get(self, fields_list):
        vals = super(MassMailing, self).default_get(fields_list)
        context = self.env.context
        if context.get('active_model') == 'crm.lead':
            vals['mailing_model_id'] = self.env['ir.model']._get(context.get('active_model')).id
            vals['mailing_domain'] = [('id', 'in', context.get('active_ids'))]
        return vals

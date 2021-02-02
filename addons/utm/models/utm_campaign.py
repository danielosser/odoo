# -*- coding: utf-8 -*-
# Part of Odoo. See LICENSE file for full copyright and licensing details.


from odoo import fields, models, api, SUPERUSER_ID


class UtmCampaign(models.Model):
    _name = 'utm.campaign'
    _description = 'UTM Campaign'

    name = fields.Char(string='Campaign Identifier', required=True, compute='_compute_name',
                       store=True, readonly=False)
    title = fields.Char(string='Campaign Name', required=True, translate=True)

    user_id = fields.Many2one(
        'res.users', string='Responsible',
        required=True, default=lambda self: self.env.uid)
    stage_id = fields.Many2one(
        'utm.stage', string='Stage', ondelete='restrict', required=True,
        default=lambda self: self.env['utm.stage'].search([], limit=1),
        group_expand='_group_expand_stage_ids')
    tag_ids = fields.Many2many(
        'utm.tag', 'utm_tag_rel',
        'tag_id', 'campaign_id', string='Tags')

    is_auto_campaign = fields.Boolean(default=False, string="Automatically Generated Campaign", help="Allows us to filter relevant Campaigns")
    color = fields.Integer(string='Color Index')

    _sql_constraints = [
        ('unique_name', 'UNIQUE(name)', 'The name must be unique'),
    ]

    @api.depends('title')
    def _compute_name(self):
        for campaign in self:
            if not campaign.id and campaign.title:
                # Compute the name only if the campaign is not yet saved
                campaign.name = self.env['utm.mixin']._set_name_unique(self._name, campaign.title)

    @api.model_create_multi
    def create(self, vals_list):
        created_names = []
        for vals in vals_list:
            if not vals.get('title'):
                vals['title'] = vals.get('name')

            force_uuid = vals.get('name') in created_names
            vals['name'] = self.env['utm.mixin']._set_name_unique(self._name, vals.get('name'), force_uuid=force_uuid)
            created_names.append(vals['name'])

        return super(UtmCampaign, self).create(vals_list)

    def copy(self, default=None):
        """Regenerate the name when duplicate the campaign."""
        default = default or {}
        default['name'] = self.env['utm.mixin']._set_name_unique(self._name, self.title)
        return super(UtmCampaign, self).copy(default=default)

    @api.model
    def _group_expand_stage_ids(self, stages, domain, order):
        """Read group customization in order to display all the stages in the
        Kanban view, even if they are empty.
        """
        stage_ids = stages._search([], order=order, access_rights_uid=SUPERUSER_ID)
        return stages.browse(stage_ids)

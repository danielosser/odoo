# -*- coding: utf-8 -*-
# Part of Odoo. See LICENSE file for full copyright and licensing details.


from odoo import _, api, fields, models
from odoo.exceptions import UserError


class UtmMedium(models.Model):
    _name = 'utm.medium'
    _description = 'UTM Medium'
    _order = 'name'

    name = fields.Char(string='Medium Name', required=True)
    active = fields.Boolean(default=True)

    _sql_constraints = [
        ('unique_name', 'UNIQUE(name)', 'The name must be unique'),
    ]

    @api.model_create_multi
    def create(self, vals_list):
        created_names = []
        for vals in vals_list:
            force_uuid = vals.get('name') in created_names
            vals['name'] = self.env['utm.mixin']._set_name_unique(self._name, vals.get('name'), force_uuid=force_uuid)
            created_names.append(vals['name'])

        return super(UtmMedium, self).create(vals_list)

    @api.ondelete(at_uninstall=False)
    def _unlink_except_utm_medium_email(self):
        utm_medium_email = self.env.ref('utm.utm_medium_email', raise_if_not_found=False)
        if utm_medium_email and utm_medium_email in self:
            raise UserError(_(
                "The UTM medium '%s' cannot be deleted as it is used in some main "
                "functional flows, such as the recruitment and the mass mailing.",
                utm_medium_email.name
            ))

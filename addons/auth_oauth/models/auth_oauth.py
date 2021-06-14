# -*- coding: utf-8 -*-
# Part of Odoo. See LICENSE file for full copyright and licensing details.
from odoo import fields, models


class AuthOAuthProvider(models.Model):
    """Class defining the configuration values of an OAuth2 provider"""

    _name = 'auth.oauth.provider'
    _description = 'OAuth2 provider'
    _order = 'sequence, name'

    name = fields.Char(string='Provider name', required=True)  # Name of the OAuth2 entity, Google, etc
    client_id = fields.Char(string='Client ID')  # Our identifier
    auth_endpoint = fields.Char(string='Authentication URL', required=True)  # OAuth provider URL to authenticate users
    scope = fields.Char()  # OAUth user data desired to access
    validation_endpoint = fields.Char(string='Validation URL', required=True)  # OAuth provider URL to validate tokens
    data_endpoint = fields.Char(string='Data URL')
    enabled = fields.Boolean(string='Allowed')
    css_class = fields.Char(string='CSS class', default='fa fa-fw fa-sign-in text-primary')
    body = fields.Char(required=True, help='Link text in Login Dialog', translate=True)
    sequence = fields.Integer(default=10)

    def _neutralize(self):
        super()._neutralize()
        self.flush()
        self.env.cr.execute("UPDATE auth_oauth_provider SET enabled = false;")
        self.invalidate_cache(fnames=['enabled'])

        if self.search([('enabled', '=', True)]):
            self._neutralize_warning("Not all oauth providers were neutralized !")

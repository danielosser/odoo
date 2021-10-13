# -*- coding: utf-8 -*-
# Part of Odoo. See LICENSE file for full copyright and licensing details.

import logging

from odoo import SUPERUSER_ID, api, exceptions, models

_logger = logging.getLogger(__name__)


class Users(models.Model):
    _inherit = 'res.users'

    @api.model
    def _remove_user(self, password):
        """Blacklist the phone of the user after deleting it."""
        phone = self.env.user.phone
        mobile = self.env.user.mobile

        super(Users, self)._remove_user(password=password)

        # Current user doesn't not exist anymore
        self = self.with_user(SUPERUSER_ID)

        if phone:
            try:
                self.env['phone.blacklist'].sudo()._add([phone])
                _logger.info('User #%i Phone blacklisted.', self.env.uid)
            except exceptions.UserError:
                _logger.info('User #%i Invalid phone can not be blacklisted.', self.env.uid)

        if mobile:
            try:
                self.env['phone.blacklist'].sudo()._add([mobile])
                _logger.info('User #%i Mobile blacklisted.', self.env.uid)
            except exceptions.UserError:
                _logger.info('User #%i Invalid mobile can not be blacklisted.', self.env.uid)

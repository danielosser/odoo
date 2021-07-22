# -*- coding: utf-8 -*-
# Part of Odoo. See LICENSE file for full copyright and licensing details.

from odoo import api, models


class IapAccount(models.Model):
    _inherit = 'iap.account'

    @api.model
    def notify_no_more_credit(self, service_name, notification_parameter=None, notify_records=None):
        """ Notify about the number of credit. In order to avoid to spam people
        an ir.config_parameter can be checked. """
        if notification_parameter:
            already_notified = self.env['ir.config_parameter'].sudo().get_param(notification_parameter, False)
            if already_notified:
                return

        iap_account = self.env['iap.account'].get(service_name, force_create=False)
        if not iap_account:
            return

        # recipients: notify creator of given records or fallback on admin
        if notify_records:
            users = notify_records.create_uid
        else:
            users = self.env.ref('base.user_admin')

        emails = []
        if users:
            emails = list(set(users.mapped('email_formatted')))
        if not emails:
            return

        mail_template = self.env.ref('iap_mail.mail_template_iap_no_credits')
        if not mail_template:
            return
        mail_template.send_mail(iap_account.id, force_send=False,
                                email_values={'email_to': ','.join(emails)}
                               )

        if notification_parameter:
            self.env['ir.config_parameter'].sudo().set_param(notification_parameter, True)

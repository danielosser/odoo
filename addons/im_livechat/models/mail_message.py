# -*- coding: utf-8 -*-
# Part of Odoo. See LICENSE file for full copyright and licensing details.

from odoo import models


class MailMessage(models.Model):
    _inherit = 'mail.message'

    def _message_format_author(self):
        """Override to return the livechat username if applicable.
        A third param is added to the tuple in this case to be able to differentiate
        it from the name in client code."""
        if self.model == 'mail.channel' and self.author_id.user_livechat_username:
            channel = self.env['mail.channel'].browse(self.res_id)
            if channel.channel_type == 'livechat':
                display_name = self.author_id.user_livechat_username or self.author_id.name
                return (self.author_id.id, display_name, self.author_id.user_livechat_username)
        return super()._message_format_author()

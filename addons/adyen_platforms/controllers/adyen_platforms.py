# -*- coding: utf-8 -*-
# Part of Odoo. See LICENSE file for full copyright and licensing details.

import json
import logging

from pprint import pformat

from odoo import http
from odoo.http import request

_logger = logging.getLogger(__name__)

class AdyenPlatformsController(http.Controller):

    @http.route('/adyen_platforms/create_account', type='http', auth='user', website=True)
    def adyen_platforms_create_account(self, creation_token):
        request.session['adyen_creation_token'] = creation_token
        return request.redirect('/web?#action=adyen_platforms.adyen_account_action_create')

    # TODO authentication from Proxy
    @http.route('/adyen_platforms/account_notification', type='json', auth='public', csrf=False)
    def adyen_platforms_notification(self):
        data = json.loads(request.httprequest.data)
        _logger.info('Account notification received: %s', pformat(data))
         # TODO change KYC stage etc.

        content = data.get('content', {})
        if data.get('eventType') == 'ACCOUNT_STATUS_CHANGED':
            # TODO sign
            state = data.get('newStatus')
            account = request.env['adyen.account'].sudo().search([('adyen_uuid', '=', data.get('adyen_uuid'))])
            if not account:
                _logger.error('Received notification for non-existing account')
                return
            if state == 'active':
                account._adyen_rpc('v1/unsuspend_account_holder', {
                    'accountHolderCode': account.account_holder_code,
                })
        elif content:
            account = request.env['adyen.account'].sudo().search([('account_holder_code', '=', content.get('accountHolderCode'))])
            if not account:
                _logger.error('Received notification for non-existing account')
                return

            msg = ''
            if content.get('invalidFields'):
                for error in content['invalidFields']:
                    msg += '%s\n' % error['ErrorFieldType'].get('errorDescription')
                account.kyc_status_message = msg
                account.message_post(body=account.kyc_status_message, subtype_xmlid="mail.mt_comment")

            if content.get('newStatus'):
                new_status = content['newStatus'].get('status')
                status_map = {
                    'Active': 'active',
                    'Inactive': 'inactive',
                    'Suspended': 'suspended',
                    'Closed': 'closed',
                }
                account.account_status = status_map.get(new_status)

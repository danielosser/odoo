# Part of Odoo. See LICENSE file for full copyright and licensing details.

import logging
import pprint
from werkzeug.exceptions import Forbidden
import json

from odoo import http
from odoo.exceptions import ValidationError, AccessError
from odoo.http import request
from odoo.tools import consteq


_logger = logging.getLogger(__name__)


class BuckarooController(http.Controller):
    _return_url = '/payment/buckaroo/return'
    WEBHOOK_AGE_TOLERANCE = 10 * 60  # seconds

    @http.route(_return_url, type='http', auth='public', methods=['POST'], csrf=False)
    def buckaroo_return_from_redirect(self, **data):
        """ Process the data returned by Buckaroo after redirection.

        :param dict data: The feedback data
        """
        if not self._verify_webhook_signature(**data):
            raise Forbidden()

        _logger.info("received notification data:\n%s", pprint.pformat(data))
        request.env['payment.transaction'].sudo()._handle_feedback_data('buckaroo', data)
        return request.redirect('/payment/status')

    @http.route('/payment/buckaroo/webhook', type='http', auth='public', methods=['POST'], csrf=False)
    def buckaroo_webhook(self, **data):
        """ Process the push response event sent by Buckaroo. Push response only informs of the transaction status.

        :return: An empty string to acknowledge the notification with an HTTP 200 response
        :rtype: str
        """
        if not self._verify_webhook_signature(**data):
            raise Forbidden()
        try:
            # Handle the feedback data crafted with Buckaroo API objects as a regular feedback
            request.env['payment.transaction'].sudo()._handle_feedback_data('buckaroo', data)
        except ValidationError: # Acknowledge the notification to avoid getting spammed
            _logger.exception("unable to handle the event data; skipping to acknowledge")
        return ''


    def _verify_webhook_signature(self, **values):
        """ Check that the signature computed from the feedback matches the received one.

        :param dict values: The values used to generate the signature
        :return: Whether the signatures match
        :rtype: str
        """
        received_signature = values.get('brq_signature')

        if not received_signature:
            _logger.warning("Push response ignored due to missing signature")
            return False

        # Retrieve the acquirer based on the tx reference included in the return url
        tx_sudo = request.env['payment.transaction'].sudo()._get_tx_from_feedback_data(
            'buckaroo', values
        )

        # Compute signature
        expected_signature = tx_sudo.acquirer_id._buckaroo_generate_digital_sign(values, incoming=True)

        # Compare signatures
        if not consteq(received_signature, expected_signature):
            _logger.warning("Push response ignored due to invalid shasign")
            return False
        else:
            return True

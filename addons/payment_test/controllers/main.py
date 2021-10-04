# Part of Odoo. See LICENSE file for full copyright and licensing details.

from odoo import http
from odoo.http import request


class PaymentTestController(http.Controller):

    @http.route('/payment/test/simulate_payment', type='json', auth='public')
    def test_simulate_payment(self, **data):
        """ Simulate the response of a payment request.

        :param dict data: The feedback data built with fake objects. See `_process_feedback_data`.
        :return: None
        """
        # Retrieve the tx and acquirer based on the tx reference included in the return url
        tx_sudo = request.env['payment.transaction'].sudo()._get_tx_from_feedback_data(
            'test', data
        )
        acquirer_sudo = tx_sudo.acquirer_id

        if acquirer_sudo.capture_manually and data['status'] == 'done':
            data['status'] = 'authorized'

        tx_sudo.cc_summary=data['customer_input'][-4:]
        del data['customer_input']

        request.env['payment.transaction'].sudo()._handle_feedback_data('test', data)

        # Redirect the user to the status page
        return request.redirect('/payment/status')

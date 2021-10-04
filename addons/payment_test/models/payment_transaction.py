# Part of Odoo. See LICENSE file for full copyright and licensing details.

from collections import defaultdict
import logging

from odoo import _, api, fields, models
from odoo.exceptions import UserError, ValidationError

from odoo.addons.payment import utils as payment_utils

_logger = logging.getLogger(__name__)


class PaymentTransaction(models.Model):
    _inherit = 'payment.transaction'

    capture_manually = fields.Boolean(related='acquirer_id.capture_manually')
    cc_summary = fields.Char(string="Credit card summary")

    def action_done(self):
        if self.provider != 'test':
            return

        feedback_data = {'reference': self.reference, 'status':'done'}
        self._handle_feedback_data('test', feedback_data)

    def action_authorized(self):
        if self.provider != 'test':
            return

        feedback_data = {'reference': self.reference, 'status':'authorized'}
        self._handle_feedback_data('test', feedback_data)

    def action_cancel(self):
        if self.provider != 'test':
            return

        feedback_data = {'reference': self.reference, 'status':'cancel'}
        self._handle_feedback_data('test', feedback_data)

    def action_error(self):
        if self.provider != 'test':
            return

        feedback_data = {'reference': self.reference, 'status':'error'}
        self._handle_feedback_data('test', feedback_data)

    def _send_payment_request(self):
        """ Override of payment to simulate a payment request.

        Note: self.ensure_one()

        :return: None
        """
        super()._send_payment_request()
        if self.provider != 'test':
            return

        if not self.token_id:
            raise UserError("Payment Test: " + _("The transaction is not linked to a token."))

        if self.acquirer_id.capture_manually:
            status = 'authorized'
        else:
            status = 'done'
        feedback_data = {'reference': self.reference, 'status':status}

        # The payment request response would normally transit through the controller but in the end,
        # all that interests us is the reference. To avoid making a localhost request, we bypass the
        # controller and handle the fake feedback data directly.
        self._handle_feedback_data('test', feedback_data)

    def _send_refund_request(self, amount_to_refund=None, create_refund_transaction=True):
        """ Override of payment to simulate a refund

        Note: self.ensure_one()

        :param float amount_to_refund: The amount to be refunded
        :param bool create_refund_transaction: Whether a refund transaction should be created
        :return: The refund transaction if any
        :rtype: recordset of `payment.transaction`
        """
        refund_tx = super()._send_refund_request(
            amount_to_refund=amount_to_refund, create_refund_transaction=create_refund_transaction
        )
        if self.provider != 'test':
            return refund_tx

        if refund_tx:
            feedback_data = {'reference': refund_tx.reference, 'status':'done'}
            self._handle_feedback_data('test', feedback_data)

        return refund_tx

    def _send_capture_request(self):
        """ Override of payment to simulate a capture request.

        Note: self.ensure_one()

        :return: None
        """
        super()._send_capture_request()
        if self.provider != 'test':
            return

        feedback_data = {'reference': self.reference, 'status':'done'}

        self._handle_feedback_data('test', feedback_data)

    def _send_void_request(self):
        """ Override of payment to simulate a void request.

        Note: self.ensure_one()

        :return: None
        """
        super()._send_void_request()
        if self.provider != 'test':
            return

        feedback_data = {'reference': self.reference, 'status':'cancel'}

        self._handle_feedback_data('test', feedback_data)

    @api.model
    def _get_tx_from_feedback_data(self, provider, data):
        """ Override of payment to find the transaction based on dummy data.

        :param str provider: The provider of the acquirer that handled the transaction
        :param dict data: The dummy feedback data
        :return: The transaction if found
        :rtype: recordset of `payment.transaction`
        :raise: ValidationError if the data match no transaction
        """
        tx = super()._get_tx_from_feedback_data(provider, data)
        if provider != 'test':
            return tx

        reference = data.get('reference')
        tx = self.search([('reference', '=', reference), ('provider', '=', 'test')])
        if not tx:
            raise ValidationError(
                "Test: " + _("No transaction found matching reference %s.", reference)
            )
        return tx

    def _process_feedback_data(self, data):
        """ Override of payment to process the transaction based on dummy data.

        Note: self.ensure_one()

        :param dict data: The dummy feedback data
        :return: None
        :raise: ValidationError if inconsistent data were received
        """
        super()._process_feedback_data(data)
        if self.provider != "test":
            return

        # Handle the status
        if not data.get('status'):
            raise ValidationError(
                "Test: " + _("Received fake data with missing status.")
            )

        if data['status'] == 'draft':
            pass
        elif data['status'] == 'pending':
            self._set_pending()
        elif data['status'] == 'authorized':
            if self.tokenize:
                self._test_tokenize_from_feedback_data(data)
            self._set_authorized()
        elif data['status'] == 'done':
            if self.tokenize:
                self._test_tokenize_from_feedback_data(data)
            self._set_done()
        elif data['status'] == 'cancel':
            self._set_canceled()
        else:  # Simulate an error status
            self._set_error(
                "Test: " + _("There has been an error with your payment: %s", data['status'])
            )

    def _test_tokenize_from_feedback_data(self, data):
        """ Create a new token based on the feedback data.

        :param dict data: The feedback data built with fake objects. See `_process_feedback_data`.
        :return: None
        """
        token = self.env['payment.token'].create({
            'acquirer_id': self.acquirer_id.id,
            'name': payment_utils.build_token_name(payment_details_short=self.cc_summary),
            'partner_id': self.partner_id.id,
            'acquirer_ref': 'fake acquirer reference',
            'verified': True,
        })
        self.write({
            'token_id': token,
            'tokenize': False,
        })
        _logger.info(
            "created token with id %s for partner with id %s", token.id, self.partner_id.id
        )

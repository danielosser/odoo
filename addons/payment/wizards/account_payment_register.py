from odoo import models, fields, api, _


class AccountPaymentRegister(models.TransientModel):
    _inherit = 'account.payment.register'

    # == Business fields ==
    payment_token_id = fields.Many2one(
        comodel_name='payment.token',
        string="Saved payment token",
        store=True, readonly=False,
        compute='_compute_payment_token_id',
        domain='''[
            (payment_method_code == 'electronic', '=', 1),
            ('company_id', '=', company_id),
            ('acquirer_id.capture_manually', '=', False),
            ('acquirer_id.journal_id', '=', journal_id),
            ('partner_id', 'in', suitable_payment_token_partner_ids),
        ]''',
        help="Note that tokens from acquirers set to only authorize transactions (instead of capturing the amount) are "
             "not available.")

    payment_refund = fields.Boolean(compute='_compute_payment_refund')

    # == Display purpose fields ==
    suitable_payment_token_partner_ids = fields.Many2many(
        comodel_name='res.partner',
        compute='_compute_suitable_payment_token_partner_ids')
    payment_method_code = fields.Char(
        related='payment_method_id.code')

    # -------------------------------------------------------------------------
    # COMPUTE METHODS
    # -------------------------------------------------------------------------

    def default_get(self, fields):
        res = super().default_get(fields)
        if res.get('line_ids') and res['line_ids'][0][0] == 6:
            line_ids = self.env['account.move.line'].browse(res['line_ids'][0][2])
            reversed_entry = line_ids.move_id.reversed_entry_id
            if reversed_entry:
                transaction = reversed_entry.transaction_ids and reversed_entry.transaction_ids[0]
                if transaction and transaction.acquirer_id.support_refund:
                    res['journal_id'] = transaction.acquirer_id.journal_id
        return res

    @api.depends('journal_id', 'currency_id', 'amount')
    def _compute_payment_refund(self):
        self.payment_refund = False
        for wizard in self:
            move_id = wizard._get_batches()[0]['lines'].move_id
            if move_id.move_type == 'out_refund':
                reversed_entry = move_id.reversed_entry_id
                transaction_id = reversed_entry.transaction_ids and reversed_entry.transaction_ids[0]

                wizard.payment_refund = transaction_id.refund_allowed and wizard.currency_id == transaction_id.currency_id and wizard.journal_id == transaction_id.acquirer_id.journal_id

    def action_create_payments(self):
        if self.payment_refund:
            move_id = self._get_batches()[0]['lines'].move_id
            reversed_entry = move_id.reversed_entry_id
            transaction_id = reversed_entry.transaction_ids and reversed_entry.transaction_ids[0]
            refund_transaction = transaction_id._create_refund_transaction(amount=self.amount, invoice_ids=move_id)
            refund_transaction._send_refund_request()

        return super().action_create_payments()

    @api.depends('can_edit_wizard')
    def _compute_suitable_payment_token_partner_ids(self):
        for wizard in self:
            if wizard.can_edit_wizard:
                lines = wizard._get_batches()[0]['lines']
                partners = lines.partner_id
                commercial_partners = partners.commercial_partner_id
                children_partners = commercial_partners.child_ids
                wizard.suitable_payment_token_partner_ids = (partners + commercial_partners + children_partners)._origin
            else:
                wizard.suitable_payment_token_partner_ids = False

    @api.onchange('can_edit_wizard', 'payment_method_id', 'journal_id')
    def _compute_payment_token_id(self):
        for wizard in self:
            if wizard.can_edit_wizard \
                    and wizard.payment_method_id.code == 'electronic' \
                    and wizard.journal_id \
                    and wizard.suitable_payment_token_partner_ids:
                wizard.payment_token_id = self.env['payment.token'].search([
                    ('partner_id', 'in', wizard.suitable_payment_token_partner_ids.ids),
                    ('acquirer_id.capture_manually', '=', False),
                    ('acquirer_id.journal_id', '=', wizard.journal_id.id),
                 ], limit=1)
            else:
                wizard.payment_token_id = False

    @api.depends('payment_type', 'journal_id', 'available_payment_method_ids')
    def _compute_payment_method_id(self):
        super()._compute_payment_method_id()

        for pay in self:
            if pay.payment_method_id and not pay.available_payment_method_ids:
                pay.payment_method_id = False

    @api.depends('payment_type',
                 'payment_refund',
                 'journal_id.inbound_payment_method_ids',
                 'journal_id.outbound_payment_method_ids')
    def _compute_payment_method_fields(self):
        super()._compute_payment_method_fields()

        for pay in self:
            move_id = pay._get_batches()[0]['lines'].move_id
            if move_id.move_type == 'out_refund' and not pay.payment_refund:
                reversed_entry = move_id.reversed_entry_id
                transaction_id = reversed_entry.transaction_ids and reversed_entry.transaction_ids[0]
                pay.available_payment_method_ids = pay.available_payment_method_ids._origin - transaction_id.acquirer_id.journal_id.outbound_payment_method_ids

    # -------------------------------------------------------------------------
    # BUSINESS METHODS
    # -------------------------------------------------------------------------

    def _create_payment_vals_from_wizard(self):
        # OVERRIDE
        payment_vals = super()._create_payment_vals_from_wizard()
        payment_vals['payment_token_id'] = self.payment_token_id.id
        return payment_vals

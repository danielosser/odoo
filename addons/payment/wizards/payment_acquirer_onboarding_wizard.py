# Part of Odoo. See LICENSE file for full copyright and licensing details.

from odoo import _, api, fields, models
from odoo.exceptions import UserError


class PaymentWizard(models.TransientModel):
    _name = 'payment.acquirer.onboarding.wizard'
    _description = 'Payment acquirer onboarding wizard'

    @api.model
    def _default_payment_method(self):
        return self._get_default_payment_acquirer_onboarding_value('payment_method')

    payment_method = fields.Selection([
        ('odoo', "Credit & Debit Card via Odoo Payments"),
        ('manual', "Custom payment instructions"),
    ], string="Payment Method", default=_default_payment_method)

    manual_name = fields.Char("Method", default=lambda self: self._get_default_payment_acquirer_onboarding_value('manual_name'))
    journal_name = fields.Char("Bank Name", default=lambda self: self._get_default_payment_acquirer_onboarding_value('journal_name'))
    acc_number = fields.Char("Account Number", default=lambda self: self._get_default_payment_acquirer_onboarding_value('acc_number'))
    manual_post_msg = fields.Html("Payment Instructions", compute="_compute_manual_post_msg", store=True, readonly=False)

    _data_fetched = fields.Boolean(store=False)

    @api.depends('journal_name', 'acc_number')
    def _compute_manual_post_msg(self):
        for wizard in self:
            if wizard.payment_method == 'manual':
                wizard.manual_post_msg = _(
                    '<h3>Please make a payment to: </h3><ul><li>Bank: %s</li><li>Account Number: %s</li><li>Account Holder: %s</li></ul>',
                    wizard.journal_name or _("Bank"),
                    wizard.acc_number or _("Account"),
                    wizard.env.company.name
                )
            else:
                wizard.manual_post_msg = ''

    _payment_acquirer_onboarding_cache = {}

    def _get_manual_payment_acquirer(self, env=None):
        if env is None:
            env = self.env
        module_id = env.ref('base.module_payment_transfer').id
        return env['payment.acquirer'].search([
            ('module_id', '=', module_id),
            ('company_id', '=', env.company.id)], limit=1)

    def _get_default_payment_acquirer_onboarding_value(self, key):
        if not self.env.is_admin():
            raise UserError(_("Only administrators can access this data."))

        if self._data_fetched:
            return self._payment_acquirer_onboarding_cache.get(key, '')

        self._data_fetched = True

        self._payment_acquirer_onboarding_cache['payment_method'] = self.env.company.payment_onboarding_payment_method

        manual_payment = self._get_manual_payment_acquirer()
        journal = manual_payment.journal_id

        self._payment_acquirer_onboarding_cache['manual_name'] = manual_payment['name']
        self._payment_acquirer_onboarding_cache['manual_post_msg'] = manual_payment['pending_msg']
        self._payment_acquirer_onboarding_cache['journal_name'] = journal.name if journal.name != "Bank" else ""
        self._payment_acquirer_onboarding_cache['acc_number'] = journal.bank_acc_number

        return self._payment_acquirer_onboarding_cache.get(key, '')

    def _install_module(self, module_name):
        module = self.env['ir.module.module'].sudo().search([('name', '=', module_name)], limit=1)
        if module.state not in ('installed', 'to install', 'to upgrade'):
            module.button_immediate_install()
            return module
        return self.env["ir.module.module"]

    def _setup_payment_transfer(self, new_env):
        manual_acquirer = self._get_manual_payment_acquirer(new_env)
        if not manual_acquirer:
            raise UserError(_(
                'No manual payment method could be found for this company. '
                'Please create one from the Payment Acquirer menu.'
            ))

        manual_acquirer.name = self.manual_name
        manual_acquirer.pending_msg = self.manual_post_msg
        manual_acquirer.state = 'enabled'

        journal = manual_acquirer.journal_id
        if journal:
            journal.name = self.journal_name
            journal.bank_acc_number = self.acc_number
        else:
            raise UserError(_("You have to set a journal for your payment acquirer %s.", self.manual_name))

    def _set_payment_acquirer_onboarding_step_done(self):
        self.env.company.sudo().set_onboarding_step_done('payment_acquirer_onboarding_state')

    def add_payment_methods(self):
        """ Install required payment acquirers, configure them and mark the
            onboarding step as done."""

        # TODO ANVFE first require proper company setup before trying to create an adyen account
        # if payment meth is odoo?

        self.env.company.payment_onboarding_payment_method = self.payment_method

        installed_modules = self.env['ir.module.module']

        if self.payment_method == 'odoo':
            installed_modules += self._install_module('payment_odoo')

        installed_modules += self._install_module('account_payment')

        if installed_modules:
            # create a new env including the freshly installed module(s)
            new_env = api.Environment(self.env.cr, self.env.uid, self.env.context)
            # self = self.with_env(new_env) ???
        else:
            new_env = self.env

        if self.payment_method == 'manual':
            self._setup_payment_transfer(new_env)

        # delete wizard data immediately to get rid of residual credentials
        # self.sudo().unlink()

        # the user clicked `apply` and not cancel so we can assume this step is done.
        # NOTE ANVFE: do we wait for adyen account creation to specify onboarding step as done ?
        self._set_payment_acquirer_onboarding_step_done()
        if self.payment_method == 'odoo':
            return new_env['payment.acquirer'].odoo_create_adyen_account()
        return {'type': 'ir.actions.act_window_close'}

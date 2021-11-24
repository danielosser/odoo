from odoo import models, fields, api


class AccountChartTemplate(models.Model):
    _inherit = 'account.chart.template'

    def _prepare_all_journals(self, acc_template_ref, company, journals_dict=None):
        """ If EGYPT chart, we add 2 new journals TA and IFRS"""
        if self == self.env.ref('l10n_eg.egypt_chart_template_standard'):
            if not journals_dict:
                journals_dict = []
            journals_dict.extend(
                [{"name": "Tax Adjustments", "company_id": company.id, "code": "TA", "type": "general", "sequence": 1,
                  "favorite": True},
                 {"name": "IFRS 16", "company_id": company.id, "code": "IFRS", "type": "general", "favorite": True,
                  "sequence": 10}])
        return super()._prepare_all_journals(acc_template_ref, company, journals_dict=journals_dict)

    def _load_template(self, company, code_digits=None, account_ref=None, taxes_ref=None):
        account_ref, taxes_ref = super(AccountChartTemplate, self)._load_template(company=company,
                                                                                  code_digits=code_digits,
                                                                                  account_ref=account_ref,
                                                                                  taxes_ref=taxes_ref)
        if self == self.env.ref('l10n_eg.egypt_chart_template_standard'):
            self.env.ref('account.tax_group_taxes').write(
                {'property_tax_payable_account_id': account_ref.get(self.env.ref('l10n_eg.egy_account_202003')),
                 'property_tax_receivable_account_id': account_ref.get(self.env.ref('l10n_eg.egy_account_100103'))})
        return account_ref, taxes_ref

# -*- coding: utf-8 -*-
from odoo import models
from odoo.http import request


class AccountChartTemplate(models.Model):
    _inherit = 'account.chart.template'

    def try_loading(self, company=False, install_demo=True):
        """
        If we are trying to load the UK chart of accounts, we need to
        determine whether we ought to be trying to load the Northern
        Ireland chart of accounts (fiscal positions, EU taxes, etc.)
        """
        if not self.country_id == self.env.ref('base.uk'):
            return super().try_loading(company, install_demo)
        else:
            # Determine whether the country of the company is Northern Ireland
            if not company:
                if request and hasattr(request, 'allowed_company_ids'):
                    company = self.env['res.company'].browse(request.allowed_company_ids[0])
                else:
                    company = self.env.company

            if company.account_fiscal_country_id == self.env.ref('base.uk') and \
               company.country_id == self.env.ref('base.xi'):
                chart_of_accounts = self.env.ref('l10n_uk.l10n_uk_ni')
                return chart_of_accounts.try_loading(company, install_demo)

            else:
                return super().try_loading(company, install_demo)

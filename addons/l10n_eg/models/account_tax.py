from odoo import fields, models, api


class Tax(models.Model):
    _inherit = 'account.tax'
    
    name = fields.Char(translate=True)


class AccountTaxReport(models.Model):
    _inherit = "account.tax.report"

    name = fields.Char(translate=True)


class AccountTaxReportLine(models.Model):
    _inherit = "account.tax.report.line"

    name = fields.Char(translate=True)
    tag_name = fields.Char(translate=True)

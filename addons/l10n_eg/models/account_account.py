from odoo import fields, models, api


class Account(models.Model):
    _inherit = 'account.account'
    
    name = fields.Char(translate=True)

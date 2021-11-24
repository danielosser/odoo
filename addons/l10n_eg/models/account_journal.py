from odoo import fields, models, api


class Journals(models.Model):
    _inherit = 'account.journal'
    
    name = fields.Char(translate=True)

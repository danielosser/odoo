# -*- coding: utf-8 -*-
from odoo import api, fields, models, _
from odoo.exceptions import ValidationError


class AccountAccountTag(models.Model):
    _name = 'account.account.tag'
    _description = 'Account Tag'

    name = fields.Char('Tag Name', required=True)
    applicability = fields.Selection([('accounts', 'Accounts'), ('taxes', 'Taxes'), ('products', 'Products')], required=True, default='accounts')
    color = fields.Integer('Color Index')
    active = fields.Boolean(default=True, help="Set active to false to hide the Account Tag without removing it.") #TODO OCO s'assurer que dispo à la vue, pour permettre une désactivation manuelle des vieux trucs ?
    tax_report_expression_ids = fields.Many2many(string="Tax Report Expressions", comodel_name='account.report.expression', relation='account_report_expression_tags_rel', compute='_compute_tax_report_expression_ids', help="The report expressions using this tag")
    tax_negate = fields.Boolean(string="Negate Tax Balance", help="Check this box to negate the absolute value of the balance of the lines associated with this tag in tax report computation.")
    country_id = fields.Many2one(string="Country", comodel_name='res.country', help="Country for which this tag is available, when applied on taxes.")

    #TODO OCO bouger sur expression, à priori
    @api.model
    def _get_tax_tags(self, tag_name, country_id): #TODO OCO mais quid quand on n'a pas de country ? Ca devient possible mtnt, ça !
        """ Returns all the tax tags corresponding to the tag name given in parameter
        in the specified country.
        """
        escaped_tag_name = tag_name.replace('\\', '\\\\').replace('%', '\%').replace('_', '\_')
        return self.env['account.account.tag'].search([('name', '=like', '_' + escaped_tag_name), ('country_id', '=', country_id), ('applicability', '=', 'taxes')])

    @api.depends('name', 'country_id', 'applicability')
    def _compute_tax_report_expression_ids(self):
        # TODO OCO DOC compute-miroir avec _compute_tag_ids
        for record in self:
            if record.applicability == 'taxes':
                record.tax_report_expression_ids = self.env['account.report.expression'].search([
                    ('report_line_id.report_id.country_id', '=', record.country_id.id),
                    ('engine', '=', 'tax_tags'),
                    ('formula', '=', record.name[1:])
                ])
            else:
                record.tax_report_expression_ids = False

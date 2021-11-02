# -*- coding: utf-8 -*-
# Part of Odoo. See LICENSE file for full copyright and licensing details.

from odoo import models, fields, api, _


class AccountReport(models.Model):
    _name = 'account.report'

    name = fields.Char(string="Name", required=True)
    filter_multi_company = fields.Boolean(string="Multi-Company", default=False) #TODO OCO garder filter_ en préfixe ?? => Peut-être ... Ou pas ... On pourrait le garder juste sur les fonctions.
    filter_date_range = fields.Boolean(string="Use Date Range", default=True) # TODO OCO remplace filter_date > True si range, False si date unique.
    allow_showing_draft = fields.Boolean(string="Allow Showing Draft Entries", default=True) #TODO OCO remplace filter_all_entries (qui n'est jamais passé à True, dirait-on)
    #TODO OCO filter_comparison
    #TODO OCO filter_journals
    #TODO OCO filter_analytic
    #TODO OCO unfold_all
    #TODO OCO filter_hierarchy
    #TODO OCO filter_partner
    filter_fiscal_position = fields.Boolean(string="Use Foreign VAT Fiscal Positions", default=False) # TODO OCO renommer ce truc serait bien
    #TODO OCO order_selected_column
    strict_date = fields.Boolean(string="Strict Date", default=True) # TODO OCO remplace le strict_range ===> meilleur nom ? Peut-être en inversant le booléen ?
    # TODO OCO  ajouter un champ default_options ou default_filters ??? Genre avec un dict en str, qui permette de dire par exemple pour le tax report qu'il s'ouvre par défaut sur le mois passé ?
    # TODO OCO attention à la gestion des tax units => le filter_multi_company, en faire un champ sélection ? (3 choix: désactivé, avec le sélecteur ou tax unit)


class AccountReportLine(models.Model):
    _name = 'account.report.line'

    # TODO OCO


class AccountReportFormula(models.Model):
    _name = 'account.report.formula'

    # TODO OCO repasser sur le phrasing
    engine = fields.Selection(
        string="Computation Engine",
        selection = [
            ('accounts_prefix': 'Prefix of accounts'),
            ('odoo_domain': 'Domain ala Odoo'),
            ('computation': 'Computation based on different lines'), # TODO OCO besoin ? ==> Quid du référencement des colonnes en temps utile ? (pas dans cette tâche) ==> + on doit toujours pouvoir créer des lignes invisible juste pour le calcul, alors, non ?
            ('tax_tags': 'tax tags that could be found on aml'),
        ],
        required=True
    )

    formula = fields.Char(string="Formula")
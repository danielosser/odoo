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
    # TODO OCO le special_date changer va être chiant avec ça. Genre, très. => On pourrait en mettre un sur le rapport directement qui sert de valeur par défaut à ses lignes ? Et les lignes peuvent spécifier le leur au besoin. (champ calculé éditable sur les lignes)
    # TODO OCO  ajouter un champ default_options ou default_filters ??? Genre avec un dict en str, qui permette de dire par exemple pour le tax report qu'il s'ouvre par défaut sur le mois passé ?
    # TODO OCO attention à la gestion des tax units => le filter_multi_company, en faire un champ sélection ? (3 choix: désactivé, avec le sélecteur ou tax unit)
    line_ids = fields.One2many(string="Lines", comodel_name='account.report.line', inverse_name='report_id')
    columns = fields.Char(string="Columns") #TODO OCO le rendre requis ; je ne le fais pas toute suite car nique l'installation à cause des financial reports~~


class AccountReportLine(models.Model):
    _name = 'account.report.line'
    _order = 'sequence, id'

    name = fields.Char(string="Name", required=True)
    """
    TODO OCO in the future, for columns:
    cell_opt1: fields.many2One(comodel=formula)
    cell_opt2: fields.many2One(comodel=formula)
    cell_opt3 fields.many2One(comodel=formula)
    TODO OCO+++> pour l'ordre des colonnes, il faudra un truc, alors. Parce que là, si cell_main est tjrs la première, on ne sait pas faire un control domain sur une des opt
    """
    expression_ids = fields.One2many(string="Expressions", comodel_name='account.report.expression', inverse_name='report_line_id')
    report_id = fields.Many2one(string="Parent Report", comodel_name='account.report', required=True)
    groupby = fields.Char(string="Group By") # TODO OCO la valeur du group by doit être acceptée par le moteur de la formule (en cas de multi colonnes, par les moteurs de chaque formule de la ligne => ce sera marrant ...)
    #TODO OCO je ne mets pas de notion de ligne parente ? Ca voudrait dire qu'on fait le flatten ici. A voir.
    sequence = fields.Integer(string="Sequence", required=True)
    column_values = fields.Char(string="Columns", required=True)#TODO OCO pas requis ? => Si pas set, prend les totaux de toutes les expressions, alors ?


    # TODO OCO ajouter le niveau de hiérarchie
    # TODO OCO ajouter invisible ?
    # TODO OCO ajouter la caret_option ici comme un champ, je dirais => sélection ??


class AccountReportExpression(models.Model):
    _name = 'account.report.expression' #TODO OCO ou rebaptiser line.cell pour éviter la confusion avec le champ formula ?

    # TODO OCO repasser sur le phrasing
    report_line_id = fields.Many2one(string="Report Line", comodel_name='account.report.line', required=True)
    total = fields.Char(string="Total", required=True)
    engine = fields.Selection(
        string="Computation Engine",
        selection = [
            ('accounts_prefix', 'Prefix of accounts'),
            ('odoo_domain', 'Domain ala Odoo'),
            ('computation', 'Computation based on different lines'), # TODO OCO besoin ? ==> Quid du référencement des colonnes en temps utile ? (pas dans cette tâche) ==> + on doit toujours pouvoir créer des lignes invisibles juste pour le calcul, alors, non ?
            ('tax_tags', 'tax tags that could be found on aml'),
            ('custom', 'Run custom python code'),
        ],
        required=True
    )

    formula = fields.Char(string="Formula")
    subformula = fields.Char(string="Subformula")
    date_scope = fields.Char(string="Date Scope") # TODO OCO généralisation du special_date_changer. Il faudra en faire un champ sélection (calculé depuis une valeur par défaut sur le rapport ??) :> ceci est temporaire.
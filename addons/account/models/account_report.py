# -*- coding: utf-8 -*-
# Part of Odoo. See LICENSE file for full copyright and licensing details.

from odoo import models, fields, api, _


class AccountReport(models.Model):
    _name = 'account.report'

    #TODO OCO garder filter_ en préfixe ?? => Peut-être ... Ou pas ... On pourrait le garder juste sur les fonctions.
    name = fields.Char(string="Name", required=True)
    filter_multi_company = fields.Boolean(string="Multi-Company", default=False) # TODO OCO on pourrait en faire un champ sélection (no, with_selector, with_tax_units)
    filter_date_range = fields.Boolean(string="Use Date Range", default=True) # TODO OCO remplace filter_date > True si range, False si date unique.
    allow_showing_draft = fields.Boolean(string="Allow Showing Draft Entries", default=True) #TODO OCO remplace filter_all_entries (qui n'est jamais passé à True, dirait-on)
    allow_comparison = fields.Boolean(string="Allow Comparison", default=True)
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
    columns = fields.Char(string="Columns") #TODO OCO le rendre requis ; je ne le fais pas tout de suite car nique l'installation à cause des financial reports~~
    dynamic_lines_generator = fields.Char(string="Dynamic Lines Generator")
    # TODO OCO ajouter un genre de séquence pour dans le sélecteur de layout ===> 2.1 serait "2ème bloc, 1ère ligne", comme ça on garde les spérateurs (si besoin) => Ou bien une catégorie de rapport ??? => default = '0.0'
    root_report_id = fields.Many2one(string="Root Report", comodel_name='account.report') # TODO OCO DOC + il faudra créer le menuitem comme avec les financial reports
    variant_report_ids = fields.One2many(string="Variants", comodel_name='account.report', inverse_name='root_report_id')# TODO OCO contrainte pour empêcher de remplire ça s'il y a un root
    country_id = fields.Many2one(string="Country", comodel_name='res.country')
    country_group_id = fields.Many2one(string="Country Group", comodel_name='res.country.group') # TODO OCO rentre mutuellement exclusif avec le pays ? => Le pays prime, en tout cas. ===> Je ne sais pas si ça vaut la peine de le garder pour le moment. A voir. Pour intrastat ?
    availability_condition = fields.Selection(
        string="Available if",
        selection=[('country', "Country Matches"), ('always', "Always")], #TODO OCO ajouter using_oss dans OSS
        required=True,
        default='always',
    )
    """
    TODO OCO tags:

    - changement de pays sur le rapport: on voit si on peut changer le pays des tags ou non.

    - changement de pays sur les tags : recalculer les expr de rapport liées (le M2m est donc un champ calculé sur les tags ET sur les expressions)

    - on check les tags pour les créer au besoin au create

    - pas d'unlink

    - pas d'édition de noms de tags ; une contrainte qui s'assure qu'il y a toujours des tags qui correspondent quand on change la formule d'une ligne de rapport
    """

    def write(self, vals):
        #TODO OCO reDOC: tax tag management

        if 'country_id' in vals:
            tags_cache = {}
            impacted_reports = self.filtered(lambda x: x.country_id.id != vals['country_id'])
            tax_tags_expressions = impacted_reports.line_ids.expression_ids.filtered(lambda x: x.engine == 'tax_tags')
            expressions_formulas = tax_tags_expressions.mapped('formula')

            for formula in expressions_formulas:
                tax_tags = self.env['account.account.tag']._get_tax_tags(formula, country.id)
                tag_reports = tax_tags.tax_report_expression_ids.report_line_id.report_id

                if all(report in self for report in tag_reports)
                    # Only reports in self are using these tags; let's change their country
                    tax_tags.write({'country_id': vals['country_id']})
                else:
                    # Another report uses these tags as well; let's keep them and create new tags in the target country
                    tag_vals = self.env['account.report.expression']._get_tags_create_vals(formula, vals['country_id'])
                    self.env['account.account.tag'].create(tag_vals)

        return super(AccountReport, self).write(vals)

    def validate_country_id(self):
        for record in self:
            if any(line.mapped('expression_ids.tag_ids.country_id') != record.country_id for line in record.line_ids):
                raise ValidationError(_("The tags associated with a report's expressions should all belong to the same country as that report."))


class AccountReportLine(models.Model):
    _name = 'account.report.line'
    _order = 'sequence, id'

    name = fields.Char(string="Name", required=True)
    expression_ids = fields.One2many(string="Expressions", comodel_name='account.report.expression', inverse_name='report_line_id')
    report_id = fields.Many2one(string="Parent Report", comodel_name='account.report', required=True)
    groupby = fields.Char(string="Group By") # TODO OCO la valeur du group by doit être acceptée par le moteur de la formule (en cas de multi colonnes, par les moteurs de chaque formule de la ligne => ce sera marrant ...)
    #TODO OCO je ne mets pas de notion de ligne parente ? Ca voudrait dire qu'on fait le flatten ici. A voir.
    sequence = fields.Integer(string="Sequence", required=True)
    column_values = fields.Char(string="Columns")#TODO OCO pas requis ? => Si pas set, prend les totaux de toutes les expressions, alors ? (et puis quand on a aucune expression, il faut voir)
    hierarchy_level = fields.Integer(string="Level", default=1, required=True)
    code = fields.Char(string="Code") # TODO OCO est-ce encore utile ?? On pourrait s'en sortir avec l'xmlid seul => non parce qu'incompréhensible dans la form view uniquement :/


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
            ('accounts_prefix', 'Prefix of accounts'),#TODO OCO
            ('odoo_domain', 'Domain ala Odoo'), #TODO OCO
            ('computation', 'Computation based on different lines'), # TODO OCO besoin ? ==> Quid du référencement des colonnes en temps utile ? (pas dans cette tâche) ==> + on doit toujours pouvoir créer des lignes invisibles juste pour le calcul, alors, non ?
            ('tax_tags', 'tax tags that could be found on aml'),
            ('custom', 'Run custom python code'),
        ],
        required=True
    )

    formula = fields.Char(string="Formula")
    subformula = fields.Char(string="Subformula")
    date_scope = fields.Char(string="Date Scope") # TODO OCO généralisation du special_date_changer. Il faudra en faire un champ sélection (calculé depuis une valeur par défaut sur le rapport ??) :> ceci est temporaire.
    tag_ids = fields.Many2many(string="Tags", comodel_name='account.account.tag', relation='account_report_expression_tags_rel', help="Tax tags populating this expression")

    @api.model
    def create(self, vals):
        # Manage tags
        rslt = super(AccountReportExpression, self).create(vals)

        tag_name = rslt.formula if rslt.engine == 'tax_tags' else None
        if tag_name:
            country = rslt.report_line_id.report_id.country_id
            existing_tags = self.env['account.account.tag']._get_tax_tags(tag_name, country.id)

            if not existing_tags:
                # We create new tags corresponding to this expression's formula.
                # The compute function will associate them with the expression.
                # TODO OCO s'assurer que le compute est bien appelé. ==> Mais dois-ce être un compute ? => Une fonction à appeler ?
                tags_command = self._get_tags_create_vals(tag_name, country.id)

        return rslt

    @api.model
    def _get_tags_create_vals(self, tag_name, country_id):
        minus_tag_vals = {
          'name': '-' + tag_name,
          'applicability': 'taxes',
          'tax_negate': True,
          'country_id': country_id,
        }
        plus_tag_vals = {
          'name': '+' + tag_name,
          'applicability': 'taxes',
          'tax_negate': False,
          'country_id': country_id,
        }
        return [(0, 0, minus_tag_vals), (0, 0, plus_tag_vals)]

    def _remove_tags_used_only_by_self(self): #TODO OCO reDOC et sans doute reNAME aussi
        """ Deletes and removes from taxes and move lines all the
        tags from the provided tax report lines that are not linked
        to any other tax report lines.
        """
        all_tags = self.tag_ids
        tags_to_unlink = all_tags.filtered(lambda x: not (x.tax_report_expression_ids - self))
        self.write({'tag_ids': [(3, tag.id, 0) for tag in tags_to_unlink]})
        self._delete_tags_from_taxes(tags_to_unlink.ids)

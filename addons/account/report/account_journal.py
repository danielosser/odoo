# -*- coding: utf-8 -*-

import time
from odoo import api, models, _
from odoo.exceptions import UserError


class ReportJournal(models.AbstractModel):
    _name = 'report.account.report_journal'
    _description = 'Account Journal Report'

    def lines(self, target_move, journal_ids, sort_selection, data):
        move_state = ['draft', 'posted']
        if target_move == 'posted':
            move_state = ['posted']

        query_get_clause = self._get_query_get_clause(data)
        params = [tuple(move_state), tuple(journal_ids)] + query_get_clause[2]
        query = 'SELECT "account_move_line".id FROM ' + query_get_clause[0] + ', account_move am, account_account acc WHERE "account_move_line".account_id = acc.id AND "account_move_line".move_id=am.id AND am.state IN %s AND "account_move_line".journal_id IN %s AND ' + query_get_clause[1] + ' ORDER BY '
        if sort_selection == 'date':
            query += '"account_move_line".date'
        else:
            query += 'am.name'
        query += ', "account_move_line".move_id, acc.code'
        self.env.cr.execute(query, tuple(params))
        res = {journal_id: {} for journal_id in journal_ids}
        ids = [x[0] for x in self.env.cr.fetchall()]
        move_lines = self.env['account.move.line'].browse(ids)
        for journal_id in journal_ids:
            res[journal_id] = move_lines.filtered(lambda l: l.journal_id.id == journal_id)
        return res

    def _sum_debit(self, data, journal_id):
        move_state = ['draft', 'posted']
        if data['form'].get('target_move', 'all') == 'posted':
            move_state = ['posted']

        query_get_clause = self._get_query_get_clause(data)
        params = [tuple(move_state), tuple(journal_id)] + query_get_clause[2]
        self.env.cr.execute('SELECT "account_move_line".journal_id, SUM(debit) FROM ' + query_get_clause[0] + ', account_move am '
                        'WHERE "account_move_line".move_id=am.id AND am.state IN %s AND "account_move_line".journal_id IN %s AND ' + query_get_clause[1] + ' GROUP BY "account_move_line".journal_id',
                        tuple(params))
        return {journal_id: debit for journal_id, debit in self.env.cr.fetchall()}

    def _sum_credit(self, data, journal_id):
        move_state = ['draft', 'posted']
        if data['form'].get('target_move', 'all') == 'posted':
            move_state = ['posted']

        query_get_clause = self._get_query_get_clause(data)
        params = [tuple(move_state), tuple(journal_id)] + query_get_clause[2]
        self.env.cr.execute('SELECT "account_move_line".journal_id, SUM(credit) FROM ' + query_get_clause[0] + ', account_move am '
                        'WHERE "account_move_line".move_id=am.id AND am.state IN %s AND "account_move_line".journal_id IN %s AND ' + query_get_clause[1] + ' GROUP BY "account_move_line".journal_id',
                        tuple(params))
        return {journal_id: credit for journal_id, credit in self.env.cr.fetchall()}

    def _get_taxes(self, data, journal_id):
        move_state = ['draft', 'posted']
        if data['form'].get('target_move', 'all') == 'posted':
            move_state = ['posted']

        query_get_clause = self._get_query_get_clause(data)
        params = [tuple(move_state), tuple(journal_id)] + query_get_clause[2]
        query = """
            SELECT "account_move_line".journal_id, at.id, SUM("account_move_line".balance) AS base_amount
            FROM account_move_line_account_tax_rel rel LEFT JOIN account_tax at ON at.id = rel.account_tax_id, """ + query_get_clause[0] + """ 
            LEFT JOIN account_move am ON "account_move_line".move_id = am.id
            WHERE "account_move_line".id = rel.account_move_line_id
                AND am.state IN %s
                AND "account_move_line".journal_id IN %s
                AND """ + query_get_clause[1] + """
           GROUP BY "account_move_line".journal_id, at.id, at.amount
           ORDER BY at.amount"""
        self.env.cr.execute(query, tuple(params))
        ids = []
        journal_ids = []
        base_amounts = {}
        for journal_id, tax_id, base_amount in self.env.cr.fetchall():
            ids.append(tax_id)
            journal_ids.append(journal_id)
            if not base_amounts.get(journal_id):
                base_amounts[journal_id] = {}
            base_amounts[journal_id][tax_id] = base_amount

        journal_types = {journal.id: journal.type for journal in self.env['account.journal'].browse(journal_ids)}
        res = {journal_id: {} for journal_id in journal_ids}

        params.append(tuple(ids))
        query = """
            SELECT "account_move_line".journal_id, tax_line_id, sum(debit - credit) 
            FROM """ + query_get_clause[0] + """, account_move am
            WHERE "account_move_line".move_id=am.id AND am.state IN %s AND "account_move_line".journal_id IN %s AND """ + query_get_clause[1] + """ AND tax_line_id IN %s 
            GROUP BY "account_move_line".journal_id, tax_line_id
        """
        self.env.cr.execute(query, tuple(params))
        tax_amounts = {}
        for journal_id, tax_line_id, sum in self.env.cr.fetchall():
            if not tax_amounts.get(journal_id):
                tax_amounts[journal_id] = {}
            tax_amounts[journal_id][tax_line_id] = sum

        for tax in self.env['account.tax'].browse(ids):
            for journal_id in journal_ids:
                base_amount = base_amounts.get(journal_id, {}).get(tax.id, False)
                if base_amount:
                    res[journal_id][tax] = {
                        'base_amount': base_amount,
                        'tax_amount': tax_amounts.get(journal_id, {}).get(tax.id, 0.0),
                    }
                    if journal_types[journal_id] == 'sale':
                        #sales operation are credits
                        res[journal_id][tax]['base_amount'] = res[journal_id][tax]['base_amount'] * -1
                        res[journal_id][tax]['tax_amount'] = res[journal_id][tax]['tax_amount'] * -1
        return res

    def _get_query_get_clause(self, data):
        return self.env['account.move.line'].with_context(data['form'].get('used_context', {}))._query_get()

    def _get_tax_grids(self, data, journal_ids):
        """
        For journal, and each grid (where +52 and -52 count as the same grid) we want to give:
          The name of the grid (E.g. 52)
          The positive amount that went into this grid (+)
          The negative amount that went into this grid (-)
          The impact that the period/journal had on this grid
        """
        move_state = ['draft', 'posted']
        if data['form'].get('target_move', 'all') == 'posted':
            move_state = ['posted']

        query_get_clause = self._get_query_get_clause(data)
        params = [tuple(move_state), tuple(journal_ids)] + query_get_clause[2]

        query = """
            WITH tag_info (journal_id, tag_name, balance) as (
                SELECT  "account_move_line".journal_id, 
                        tag.name, 
                        SUM(COALESCE("account_move_line".balance, 0)
                                     * CASE WHEN tag.tax_negate THEN -1 ELSE 1 END
                                     * CASE WHEN "account_move_line".tax_tag_invert THEN -1 ELSE 1 END
                                 ) AS balance
                FROM account_account_tag tag 
                JOIN account_account_tag_account_move_line_rel rel ON tag.id = rel.account_account_tag_id, 
                """ + query_get_clause[0] + """
                LEFT JOIN account_move am ON "account_move_line".move_id = am.id
                WHERE applicability = 'taxes'
                AND am.state IN %s
                AND "account_move_line".journal_id IN %s
                AND """ + query_get_clause[1] + """ AND "account_move_line".id = rel.account_move_line_id
                GROUP BY "account_move_line".journal_id, tag.name
            )
            SELECT 
            journal_id,
            substring(tag_name from 2 for length(tag_name) - 1) AS name, 
            balance, 
            CASE WHEN sign(balance) = 1 THEN '+' ELSE '-' END AS sign
            FROM tag_info
            ORDER BY journal_id, name
        """
        self.env.cr.execute(query, tuple(params))
        res = {}

        for journal_id, name, balance, sign in self.env.cr.fetchall():
            if not res.get(journal_id):
                res[journal_id] = {}
            if not res[journal_id].get(name):
                res[journal_id][name] = {}
            res[journal_id][name]['grid'] = name
            res[journal_id][name][sign] = res[journal_id][name].get(sign, 0) + balance
            res[journal_id][name]['impact'] = res[journal_id][name].get('+', 0) + res[journal_id][name].get('-', 0)

        return res

    @api.model
    def _get_report_values(self, docids, data=None):
        if not data.get('form'):
            raise UserError(_("Form content is missing, this report cannot be printed."))

        target_move = data['form'].get('target_move', 'all')
        sort_selection = data['form'].get('sort_selection', 'date')

        journal_ids = data['form']['journal_ids']

        res = self.with_context(data['form'].get('used_context', {})).lines(target_move, journal_ids, sort_selection, data)
        sum_credits = self._sum_credit(data, journal_ids)
        sum_debits = self._sum_debit(data, journal_ids)
        taxes_details = self._get_taxes(data, journal_ids)
        tax_grid_details = self._get_tax_grids(data, journal_ids)

        return {
            'doc_ids': data['form']['journal_ids'],
            'doc_model': self.env['account.journal'],
            'data': data,
            'docs': self.env['account.journal'].browse(data['form']['journal_ids']),
            'time': time,
            'lines': res,
            'sum_credits': sum_credits,
            'sum_debits': sum_debits,
            'taxes_details': taxes_details,
            'tax_grid_details': tax_grid_details,
            'company_id': self.env['res.company'].browse(
                data['form']['company_id'][0]),
        }

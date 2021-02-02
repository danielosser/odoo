# -*- coding: utf-8 -*-
# Part of Odoo. See LICENSE file for full copyright and licensing details.


from odoo import _, fields, models, tools


class UtmSource(models.Model):
    _name = 'utm.source'
    _description = 'UTM Source'

    name = fields.Char(string='Source Name', required=True)

    _sql_constraints = [
        ('unique_name', 'UNIQUE(name)', 'The name must be unique'),
    ]

    def _generate_name(self, record, content):
        """Generate the UTM source name based on the content of the source."""
        content = content.replace('\n', ' ')
        if len(content) >= 24:
            content = f'{content[:20]}...'

        create_date = record.create_date or fields.date.today()
        create_date = fields.date.strftime(create_date, tools.DEFAULT_SERVER_DATE_FORMAT)
        model_description = self.env['ir.model']._get(record._name).name
        name = _('%s (%s created on %s)', content, model_description, create_date)

        return self.env['utm.mixin']._set_name_unique(self._name, name)

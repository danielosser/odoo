# -*- coding: utf-8 -*-

from ast import literal_eval
from collections import OrderedDict
from odoo import models, fields, api, _
from odoo.exceptions import ValidationError, MissingError
from odoo.osv import expression
from odoo.tools import html_escape as escape
from lxml import etree as ET
import logging

_logger = logging.getLogger(__name__)


class WebsiteFilterTemplate(models.Model):
    _name = 'website.filter.template'
    _description = 'Website Filter Template'
    _order = 'name ASC'

    name = fields.Char(required=True)
    view_id = fields.Many2one('ir.ui.view', string='View', required=True, ondelete="cascade")
    used_fields = fields.Many2many('ir.model.fields')

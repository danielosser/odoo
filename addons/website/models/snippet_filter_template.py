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


class SnippetFilterTemplate(models.Model):
    _name = 'website.snippet_filter_template'
    _inherit = ['ir.ui.view']
    _description = 'Snippet Filter Template'
    _order = 'name ASC'

    # used fields: {'text': ['title', 'subtitle', 'description'], 'image': ['picture']}
    used_fields = fields.Char(help="A list of comma-separated field names", required=True)

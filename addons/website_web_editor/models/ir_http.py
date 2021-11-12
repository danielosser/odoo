# Part of Odoo. See LICENSE file for full copyright and licensing details.
from odoo import models
from odoo.http import request


class IrHttp(models.AbstractModel):
    _inherit = 'ir.http'

    @classmethod
    def _web_editor_context(cls):
        ctx = super()._web_editor_context()
        if request.is_frontend_multilang and request.lang == cls._get_default_lang():
            ctx['edit_translations'] = False
        return ctx

    @classmethod
    def _frontend_pre_dispatch(cls):
        super()._frontend_pre_dispatch()
        ctx = cls._web_editor_context()
        request.update_context(**ctx)

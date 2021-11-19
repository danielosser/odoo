# -*- coding: utf-8 -*-
# Part of Odoo. See LICENSE file for full copyright and licensing details.

from odoo import api, models
from odoo.exceptions import UserError
from pathlib import Path
from reportlab.graphics.shapes import Image as ReportLabImage
from reportlab.lib.units import mm

from odoo.models import Model

CH_QR_CROSS_SIZE_RATIO = 0.1214  # Ratio between the side length of the Swiss QR-code cross image and the QR-code's
CH_QR_CROSS_FILE = Path(
    '../static/src/img/CH-Cross_7mm.png')  # Image file containing the Swiss QR-code cross to add on top of the QR-code


class IrActionsReport(models.Model):
    _inherit = 'ir.actions.report'
    errors = {}
    error_type_strings = ["IBAN", "country code"]

    def retrieve_attachment(self, record):
        # types d'erreur possibles :
        # iban invalide
        # code pays non CH
        if self.report_name == 'l10n_ch.qr_report_main':
            record.ensure_one()
            try:
                record.partner_bank_id._eligible_for_qr_code('ch_qr', record.partner_id, record.currency_id) is True
            except UserError as uex:
                for err_type in self.error_type_strings:
                    if err_type in uex.name:
                        self._add_error(err_type, record.display_name)

            record.l10n_ch_isr_sent = True
        return super(IrActionsReport, self).retrieve_attachment(record)

    def _render_qweb_pdf(self, res_ids=None, data=None):
        Model = self.env[self.model]
        record_ids = Model.browse(res_ids)
        for record_id in record_ids:
            attachment = self.retrieve_attachment(record_id)
        if self.errors:
            msg = self._get_error_msg()
            self.errors.clear()
            raise UserError(msg)
        super(IrActionsReport, self)._render_qweb_pdf(res_ids, data)

    def _get_error_msg(self):
        msg = ""
        if self.errors["IBAN"] and len(self.errors["IBAN"]) > 0:
            msg += "Custom IBAN was wrong on %s invoices : %s \n" % (len(self.errors["IBAN"]), ", ".join(self.errors["IBAN"]))
        if "country code" in self.errors.keys() and len(self.errors["IBAN"]) > 0:
            msg += "The country code isn't CH on %s invoices : %s \n" % (len(self.errors["IBAN"]), ", ".join(self.errors["IBAN"]))
            #To continue
        return msg

    def _add_error(self, error_type_str, record_display_name):
        if error_type_str not in self.errors:
            self.errors[
                error_type_str] = []
        self.errors[error_type_str].append(record_display_name)

    @api.model
    def get_available_barcode_masks(self):
        rslt = super(IrActionsReport, self).get_available_barcode_masks()
        rslt['ch_cross'] = self.apply_qr_code_ch_cross_mask
        return rslt

    @api.model
    def apply_qr_code_ch_cross_mask(self, width, height, barcode_drawing):
        cross_width = CH_QR_CROSS_SIZE_RATIO * width
        cross_height = CH_QR_CROSS_SIZE_RATIO * height
        cross_path = Path(__file__).absolute().parent / CH_QR_CROSS_FILE
        qr_cross = ReportLabImage((width / 2 - cross_width / 2) / mm, (height / 2 - cross_height / 2) / mm,
                                  cross_width / mm, cross_height / mm, cross_path.as_posix())
        barcode_drawing.add(qr_cross)

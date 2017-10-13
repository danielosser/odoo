# -*- coding: utf-8 -*-
# Part of Odoo. See LICENSE file for full copyright and licensing details.
import base64
import json

from odoo import http, _
from odoo.http import request
from odoo.addons.website_sale.controllers.main import WebsiteSale
from odoo.exceptions import ValidationError


class WebsiteSale(WebsiteSale):

    @http.route()
    def cart_update(self, product_id, add_qty=1, set_qty=0, **kw):
        # consider product as configurable if product template found in params
        res = {}
        if kw.get('product_tmpl_id'):
            product = request.env['product.template'].browse(int(kw['product_tmpl_id'])).exists()
            custom_vals = self._prepare_custom_attribute_data(**kw)
            value_ids = self._prepare_attribute_data(**kw)
            try:
                product_id = product.create_get_variant(value_ids, custom_vals)
            except ValidationError as e:
                res['error'] = e.name
            res['redirect'] = '/shop/cart'

        super_res = super(WebsiteSale, self).cart_update(product_id=product_id, add_qty=add_qty, set_qty=set_qty, **kw)
        return res and json.dumps(res) or super_res

    def _filter_custom_attributes(self, **kw):
        return {k: v for k, v in kw.items() if "custom_attr" in k}

    def _prepare_custom_attribute_data(self, **kw):
        attributes = self._filter_custom_attributes(**kw)
        custom_vals = {}
        for k, v in attributes.items():
            if not v:
                continue
            custom_str, value_type, attribute_id = k.split('-')
            if value_type == 'binary':
                custom_vals[int(attribute_id)] = {
                    'id': int(attribute_id),
                    'name': v.filename,
                    'value': base64.encodestring(v.read()),
                    'value_type': value_type
                }
            else:
                custom_vals[int(attribute_id)] = {
                    'id': int(attribute_id),
                    'value': v,
                    'value_type': value_type
                }
        return custom_vals

    def _prepare_attribute_data(self, **kw):
        attributes = []
        for k, v in self._filter_attributes(**kw).items():
            attributes.append(int(v))
        return attributes

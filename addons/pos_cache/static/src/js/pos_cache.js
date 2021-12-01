odoo.define('pos_cache.pos_cache', function (require) {
"use strict";

var models = require('point_of_sale.models');
var core = require('web.core');
var { Gui } = require('point_of_sale.Gui');
const Registries = require('point_of_sale.Registries');
var _t = core._t;
var pos_env = require('point_of_sale.env');

function roundUpDiv(y, x) {
    const remainder = y % x;
    return (y - remainder) / x + (remainder > 0 ? 1 : 0);
}

Registries.PosModelRegistry.extend(models.PosGlobalState, (PosGlobalState) => {
class PosCachePosModel extends PosGlobalState {
    async loadProductsBackground() {
        if (this.config.limited_products_loading) {
            // Just do the native way of loading products when limited_product_loading is active.
            return super.loadProductsBackground(...arguments);
        }
        const nInitiallyLoaded = Object.keys(this.db.product_by_id).length;
        const totalProductsCount = await this._getTotalProductsCount();
        const nRemaining = totalProductsCount - nInitiallyLoaded;
        if (!(nRemaining > 0)) return;
        const multiple = 100000;
        const nLoops = roundUpDiv(nRemaining, multiple);
        for (let i = 0; i < nLoops; i++) {
            await this._loadCachedProducts(i * multiple + nInitiallyLoaded, (i + 1) * multiple + nInitiallyLoaded);
        }
        Gui.showNotification(_t('All products are loaded.'), 5000);
    }
    async _getTotalProductsCount() {
        return pos_env.services.rpc({
            model: 'pos.session',
            method: 'get_total_products_count',
            args: [[odoo.pos_session_id]],
            context: pos_env.session.user_context,
        });
    }
    async _loadCachedProducts(start, end) {
        const products = await pos_env.services.rpc({
            model: 'pos.session',
            method: 'get_cached_products',
            args: [[odoo.pos_session_id], start, end],
            context: pos_env.session.user_context,
        });
        const productModel = _.find(this.models, function(model){return model.model === 'product.product';});
        productModel.loaded(this, products);
    }
}

return PosCachePosModel;
});

});

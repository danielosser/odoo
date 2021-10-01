odoo.define('stock.InventoryAdjustmentsListView', function (require) {
    'use strict';
    
    var InventoryReportListView = require('stock.InventoryReportListView');
    var InventoryAdjustmentsListController = require('stock.InventoryAdjustmentsListController');
    var InventoryAdjustmentsListRenderer = require('stock.InventoryAdjustmentsListRenderer');
    var viewRegistry = require('web.view_registry');
    
    var InventoryAdjustmentsListView = InventoryReportListView.extend({
        config: _.extend({}, InventoryReportListView.prototype.config, {
            Controller: InventoryAdjustmentsListController,
            Renderer: InventoryAdjustmentsListRenderer,
        }),
    });
    
    viewRegistry.add('inventory_adjustments_list', InventoryAdjustmentsListView);
    
    return InventoryAdjustmentsListView;
    
    });
    
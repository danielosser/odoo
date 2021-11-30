/** @odoo-module **/

import PosComponent from 'point_of_sale.PosComponent';
import Registries from 'point_of_sale.Registries';

export class PointsCounter extends PosComponent {
    get_points() {
        return this.env.pos.get_order.get_loyalty_points();
    }
}

Registries.Component.add(PointsCounter);

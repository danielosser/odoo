/** @odoo-module alias=point_of_sale.PaymentScreenStatus **/

import PosComponent from 'point_of_sale.PosComponent';

class PaymentScreenStatus extends PosComponent {
    get activeOrder() {
        return this.props.activeOrder;
    }
    get changeText() {
        const change = this.env.model.getOrderChange(this.activeOrder);
        return this.env.model.formatCurrency(change);
    }
    get totalDueText() {
        const totalAmountToPay = this.env.model.getAmountToPay(this.activeOrder);
        return this.env.model.formatCurrency(totalAmountToPay);
    }
    get remainingText() {
        const remaining = this.env.model.getOrderDue(this.activeOrder);
        return this.env.model.formatCurrency(remaining);
    }
}
PaymentScreenStatus.template = 'point_of_sale.PaymentScreenStatus';

export default PaymentScreenStatus;

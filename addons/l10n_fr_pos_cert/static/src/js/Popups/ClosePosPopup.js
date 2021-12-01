odoo.define('l10n_fr_pos_cert.ClosePosPopup', function (require) {
    'use strict';

    const ClosePosPopup = require('point_of_sale.ClosePosPopup');
    const Registries = require('point_of_sale.Registries');

    const PosFrCertClosePopup = (ClosePosPopup) =>
        class extends ClosePosPopup {
            getLimitDate() {
                let limitDate = new Date(this.env.pos.pos_session.start_at);
                limitDate.setDate(limitDate.getDate() + 1);
                return limitDate;
            }
            canCloseSession() {
                let canClose = true;
                if (this.env.pos.is_french_country() && this.env.pos.pos_session.start_at) {
                    const now = Date.now();
                    const limitDate = this.getLimitDate();
                    if (limitDate < now) {
                        canClose = !this.env.pos.config.module_pos_hr || this.isManager;
                    }
                }
                return super.canCloseSession() && canClose;
            }
            canCancel() {
                let canCancel = true;
                if (this.env.pos.is_french_country() && this.env.pos.pos_session.start_at) {
                    const now = Date.now();
                    const limitDate = this.getLimitDate();
                    canCancel = limitDate >= now;
                }
                return super.canCancel() && canCancel;
            }
        };

    Registries.Component.extend(ClosePosPopup, PosFrCertClosePopup);

    return ClosePosPopup;
});

/** @odoo-module **/

import { registerMessagingComponent } from '@mail/utils/messaging_component';

const { Component } = owl;

export class MobileMessagingNavbar extends Component {

    /**
     * @returns {mail.MobileMessagingNavbarView}
     */
    get mobileMessagingNavbarView() {
        return this.messaging && this.messaging.models['MobileMessagingNavbarView'].get(this.props.mobileMessagingNavbarViewLocalId);
    }

    //--------------------------------------------------------------------------
    // Handlers
    //--------------------------------------------------------------------------

    /**
     * @private
     * @param {MouseEvent} ev
     */
    _onClick(ev) {
        this.mobileMessagingNavbarView.onClick(ev.currentTarget.dataset.tabId);
    }

}

Object.assign(MobileMessagingNavbar, {
    props: {
        onSelectMobileMessagingNavbarTab: {
            type: Function,
            optional: true,
        },
        mobileMessagingNavbarViewLocalId: String,
    },
    template: 'mail.MobileMessagingNavbar',
});

registerMessagingComponent(MobileMessagingNavbar);

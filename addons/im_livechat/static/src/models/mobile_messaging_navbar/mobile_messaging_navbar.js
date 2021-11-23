/** @odoo-module **/

import { patchRecordMethods } from '@mail/model/model_core';
// ensure that the model definition is loaded before the patch
import '@mail/models/mobile_messaging_navbar_view/mobile_messaging_navbar_view';

patchRecordMethods('MobileMessagingNavbarView', {
    /**
     * @override
     */
    _computeTabs() {
        if (this.discuss) {
            return [...this._super(), {
                icon: 'fa fa-comments',
                id: 'livechat',
                label: this.env._t("Livechat"),
            }];
        }
        return this._super();
    },
});

/** @odoo-module **/

import { patchFields, patchRecordMethods } from '@mail/model/model_core';
import { one2one } from '@mail/model/model_field';

// ensure that the model definition is loaded before the patch
import '@mail/models/discuss/discuss';

patchRecordMethods('mail.discuss', {

    /**
     * @override
     */
    onInputQuickSearch(value) {
        if (!this.sidebarQuickSearchValue) {
            this.categoryLivechat.open();
        }
        return this._super(value);
    },
});

patchFields('mail.discuss', {
    /**
     * Discuss sidebar category for `livechat` channel threads.
     */
    categoryLivechat: one2one('mail.discuss_sidebar_category', {
        inverse: 'discussAsLivechat',
        isCausal: true,
    }),
});

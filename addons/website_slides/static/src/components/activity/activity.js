/** @odoo-module **/

import { Activity } from '@mail/components/activity/activity';

import { patch } from 'web.utils';

patch(Activity.prototype, 'website_slides/static/src/components/activity/activity.js', {

    //--------------------------------------------------------------------------
    // Handlers
    //--------------------------------------------------------------------------

    /**
     * @private
     */
    async _onGrantAccess(ev) {
        await this.env.services.rpc({
            model: 'slide.channel',
            method: 'action_grant_access',
            args: [[this.activityView.activity.thread.id]],
            kwargs: { partner_id: this.activityView.activity.requestingPartner.id },
        });
        if (this.activityView && this.activityView.activity) {
            this.activityView.activity.delete();
        }
        this.trigger('reload', { keepChanges: true });
    },
    /**
     * @private
     */
    async _onRefuseAccess(ev) {
        await this.env.services.rpc({
            model: 'slide.channel',
            method: 'action_refuse_access',
            args: [[this.activityView.activity.thread.id]],
            kwargs: { partner_id: this.activityView.activity.requestingPartner.id },
        });
        if (this.activityView && this.activityView.activity) {
            this.activityView.activity.delete();
        }
        this.trigger('reload', { keepChanges: true });
    },
});

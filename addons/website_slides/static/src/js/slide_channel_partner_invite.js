/** @odoo-module **/

import ListController from 'web.ListController';
import ListView from 'web.ListView';
import viewRegistry from 'web.view_registry';

var SlideChannelPartnerInviteListController = ListController.extend({
    buttons_template:'SlideChannelPartnerInviteListView.buttons',

    renderButtons: function() {
        this._super.apply(this, arguments);
        if (this.$buttons) {
            this.$buttons.on('click', '.o_button_slide_channel_partner_invite', () => {
                const channelId = this.model.loadParams.context.search_default_channel_id;
                this._rpc({
                    model: 'slide.channel.partner',
                    method: 'action_channel_partner_invite',
                    args: ["", channelId | false]
                }).then(action =>
                    this.do_action(action, {on_close: () => this.reload()})
                );
            });
        }
    },
});

var SlideChannelPartnerInviteListView = ListView.extend({
    config: _.extend({}, ListView.prototype.config, {
        Controller: SlideChannelPartnerInviteListController,
    }),
});

viewRegistry.add('slide_channel_partner_invite_tree', SlideChannelPartnerInviteListView);

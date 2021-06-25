/** @odoo-module **/

import { registerInstancePatchModel } from '@mail/model/model_core';
import { executeGracefully } from '@mail/utils/utils';

registerInstancePatchModel('mail.messaging_initializer', 'im_livechat/static/src/models/messaging_initializer/messaging_initializer.js', {

    //----------------------------------------------------------------------
    // Private
    //----------------------------------------------------------------------

    /**
     * @override
     * @param {Object[]} [param0.channel_livechat=[]]
     */
    async _initChannels(initMessagingData) {
        await this.async(() => this._super(initMessagingData));
        const { channel_livechat = [] } = initMessagingData;
        return executeGracefully(channel_livechat.map(data => () => {
            const channel = this.env.services.messaging.models['mail.thread'].insert(
                this.env.services.messaging.models['mail.thread'].convertData(data),
            );
            // flux specific: channels received at init have to be
            // considered pinned. task-2284357
            if (!channel.isPinned) {
                channel.pin();
            }
        }));
    },
});

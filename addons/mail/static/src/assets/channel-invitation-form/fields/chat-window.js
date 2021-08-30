/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            chatWindow
        [Field/model]
            ChannelInvitationForm
        [Field/type]
            o2o
        [Field/target]
            ChatWindow
        [Field/isReadonly]
            true
        [Field/inverse]
            ChatWindow/channelInvitationForm
`;
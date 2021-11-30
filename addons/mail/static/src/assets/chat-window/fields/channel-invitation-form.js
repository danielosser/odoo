/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        Determines the channel invitation form displayed by this chat window
        (if any). Only makes sense if hasInviteFeature is true.
    {Field}
        [Field/name]
            channelInvitationForm
        [Field/model]
            ChatWindow
        [Field/type]
            o2o
        [Field/target]
            ChannelInvitationForm
        [Field/isCausal]
            true
        [Field/inverse]
            ChannelInvitationForm/chatWindow
`;

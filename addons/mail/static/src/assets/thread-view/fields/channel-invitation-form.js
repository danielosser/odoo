/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        States which channel invitation form is operating this thread view.
        Only applies if this thread is a channel.
    {Field}
        [Field/name]
            channelInvitationForm
        [Field/model]
            ThreadView
        [Field/type]
            o2o
        [Field/target]
            ChannelInvitationForm
        [Field/inverse]
            ChannelInvitationForm/threadView
        [Field/isCausal]
            true
`;

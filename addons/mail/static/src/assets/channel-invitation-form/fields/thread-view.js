/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        States the thread view on which this list operates (if any).
    {Field}
        [Field/name]
            threadView
        [Field/model]
            ChannelInvitationForm
        [Field/type]
            o2o
        [Field/target]
            ThreadView
        [Field/isReadonly]
            true
        [Field/inverse]
            ThreadView/channelInvitationForm
`;
/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            popoverView
        [Field/model]
            ChannelInvitationForm
        [Field/type]
            o2o
        [Field/target]
            PopoverView
        [Field/isCausal]
            true
        [Field/inverse]
            PopoverView/channelInvitationForm
`;
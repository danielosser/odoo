/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        The record that represents the content inside the popover view.
    {Field}
        [Field/name]
            channelInvitationForm
        [Field/model]
            PopoverView
        [Field/type]
            o2o
        [Field/target]
            ChannelInvitationForm
        [Field/isCausal]
            true
        [Field/isReadonly]
            true
        [Field/isRequired]
            true
        [Field/inverse]
            ChannelInvitationForm/popoverView
`;

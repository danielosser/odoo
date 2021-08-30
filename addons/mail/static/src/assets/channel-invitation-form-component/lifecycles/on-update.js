/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Lifecycle}
        [Lifecycle/name]
            onUpdate
        [Lifecycle/model]
            ChannelInvitationFormComponent
        [Lifecycle/behavior]
            {ChannelInvitationForm/onComponentUpdate}
                @record
                .{ChannelInvitationFormComponent/ChannelInvitationForm}
`;

/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            invitationLinkInput
        [Element/model]
            ChannelInvitationFormComponent
        [web.Element/tag]
            input
        [web.Element/type]
            text
        [web.Element/value]
            @record
            .{ChannelInvitationFormComponent/channelInvitationForm}
            .{ChannelInvitationForm/thread}
            .{Thread/invitationLink}
`;

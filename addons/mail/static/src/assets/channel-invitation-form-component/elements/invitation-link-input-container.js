/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            invitationLinkInputContainer
        [Element/model]
            ChannelInvitationFormComponent
        [Element/isPresent]
            @record
            .{ChannelInvitationFormComponent/channelInvitationForm}
            .{ChannelInvitationForm/thread}
            .{&}
                @record
                .{ChannelInvitationFormComponent/channelInvitationForm}
                .{ChannelInvitationForm/thread}
                .{Thread/invitationLink}
        [web.Element/class]
            mx-3
            my-2
`;

/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            selectedPartner
        [Element/model]
            ChannelInvitationFormComponent
        [Model/traits]
            Foreach
        [Foreach/collection]
            @record
            .{ChannelInvitationFormComponent/channelInvitationForm}
            .{ChannelInvitationForm/selectedPartners}
        [Foreach/as]
            selectedPartner
        [Foreach/key]
            @field
            .{Foreach/get}
                selectedPartner
            .{Record/id}
        [Field/target]
            ChannelInvitationFormComponent:selectedPartner
        [ChannelInvitationFormComponent:selectedPartner/selectedPartner]
            @field
            .{Foreach/get}
                selectedPartner
`;

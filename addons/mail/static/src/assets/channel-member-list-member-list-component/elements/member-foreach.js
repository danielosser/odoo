/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            memberForeach
        [Element/model]
            ChannelMemberListMemberListComponent
        [Model/traits]
            Foreach
        [Foreach/collection]
            @record
            .{ChannelMemberListMemberListComponent/members}
        [Foreach/as]
            member
        [Element/key]
            @field
            .{Foreach/get}
                member
            .{Record/id}
        [Field/target]
            ChannelMemberListMemberListComponent:member
        [ChannelMemberListMemberListComponent:member/member]
            @field
            .{Foreach/get}
                member
`;

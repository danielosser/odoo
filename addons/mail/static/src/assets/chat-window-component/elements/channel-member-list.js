/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            channelMemberList
        [Element/model]
            ChatWindowComponent
        [Field/target]
            ChannelMemberListComponent
        [Element/isPresent]
            @record
            .{ChatWindowComponent/chatWindow}
            .{ChatWindow/thread}
            .{Thread/hasMemberListFeature}
            .{&}
                @record
                .{ChatWindowComponent/chatWindow}
                .{ChatWindow/isMemberListOpened}
        [Element/props]
            [ChannelMemberListComponent/channel]
                @record
                .{ChatWindowComponent/chatWindow}
                .{ChatWindow/thread}
        [web.Element/class]
            bg-white
`;

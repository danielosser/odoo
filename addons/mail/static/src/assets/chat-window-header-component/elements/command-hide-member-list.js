/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            commandHideMemberList
        [Element/model]
            ChatWindowHeaderComponent
        [Model/traits]
            ChatWindowHeaderComponent/command
        [Element/isPresent]
            @record
            .{ChatWindowHeaderComponent/chatWindow}
            .{ChatWindow/thread}
            .{Thread/hasMemberListFeature}
            .{&}
                @record
                .{ChatWindowHeaderComponent/chatWindow}
                .{ChatWindow/isMemberListOpened}
        [web.Element/title]
            {Locale/text}
                Hide Member List
        [Element/onClick]
            {ChatWindow/onClickHideMemberList}
                [0]
                    @record
                    .{ChatWindowHeaderComponent/chatWindow}
                [1]
                    @ev
`;

/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            commandShowMemberList
        [Element/model]
            ChatWindowHeaderComponent
        [Model/traits]
            ChatWindowHeaderComponentcommand
        [Element/isPresent]
            @record
            .{ChatWindowHeaderComponent/chatWindow}
            .{ChatWindow/thread}
            .{Thread/hasMemberListFeature}
            .{&}
                @record
                .{ChatWindowHeaderComponent/chatWindow}
                .{ChatWindow/isMemberListOpened}
                .{isFalsy}
        [web.Element/title]
            {Locale/text}
                Show Member List
        [Element/onClick]
            {ChatWindow/onClickShowMemberList}
                [0]
                    @record
                    .{ChatWindowHeaderComponent/chatWindow}
                [1]
                    @ev
`;

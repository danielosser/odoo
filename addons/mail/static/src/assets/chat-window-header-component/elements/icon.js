/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            icon
        [Element/model]
            ChatWindowHeaderComponent
        [Field/target]
            ThreadIconComponent
        [Model/traits]
            ChatWindowHeaderComponent/item
        [Element/isPresent]
            @record
            .{ChatWindowHeaderComponent/chatWindow}
            .{ChatWindow/thread}
            .{&}
                @record
                .{ChatWindowHeaderComponent/chatWindow}
                .{ChatWindow/thread}
                .{Thread/model}
                .{=}
                    mail.channel
        [Element/props]
            [ThreadIconComponent/thread]
                @record
                .{ChatWindowHeaderComponent/chatWindow}
                .{ChatWindow/thread}
`;

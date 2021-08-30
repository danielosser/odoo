/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            listItem
        [Element/model]
            ChatWindowHiddenMenuComponent
        [Model/traits]
            Foreach
        [Foreach/collection]
            {ChatWindowManager/allOrderedHidden}
        [Foreach/as]
            chatWindow
        [Element/key]
            @field
            .{Foreach/get}
                chatWindow
            .{Record/id}
        [Field/target]
            ChatWindowHiddenMenuComponent:listItem
        [ChatWindowHiddenMenuComponent:listItem/chatWindow]
            @field
            .{Foreach/get}
                chatWindow
`;

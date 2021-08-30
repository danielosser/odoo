/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            chatWindowForeach
        [Element/model]
            ChatWindowManagerComponent
        [Model/traits]
            Foreach
        [Field/target]
            ChatWindowManagerComponent:chatWindow
        [Element/isPresent]
            {Messaging/isInitialized}
        [Foreach/collection]
            {ChatWindowManager/allOrderedVisible}
        [Foreach/as]
            chatWindow
        [Element/key]
            @field
            .{Foreach/get}
                chatWindow
            .{Record/id}
        [ChatWindowManagerComponent:chatWindow/chatWindow]
            @field
            .{Foreach/get}
                chatWindow
`;

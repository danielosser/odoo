/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Test}
        [Test/name]
            new message: focused on open
        [Test/model]
            ChatWindowManagerComponent
        [Test/assertions]
            2
        [Test/isFocusRequired]
            true
        [Test/scenario]
            :testEnv
                {Record/insert}
                    [Record/traits]
                        Env
            @testEnv
            .{Record/insert}
                [Record/traits]
                    Server
                [Server/data]
                    @record
                    .{Test/data}
            @testEnv
            .{Record/insert}
                []
                    [Record/traits]
                        ChatWindowManagerComponent
                []
                    [Record/traits]
                        MessagingMenuComponent
            @testEnv
            .{Component/afterNextRender}
                {func}
                    @testEnv
                    .{UI/click}
                        @testEnv
                        .{MessagingMenu/messagingMenuComponents}
                        .{Collection/first}
                        .{MessagingMenuComponent/toggler}
            @testEnv
            .{Component/afterNextRender}
                {func}
                    @testEnv
                    .{UI/click}
                        @testEnv
                        .{MessagingMenu/messagingMenuComponents}
                        .{Collection/first}
                        .{MessagingMenuComponent/newMessageButton}
            {Test/assert}
                []
                    @testEnv
                    .{ChatWindowManager/newMessageChatWindow}
                    .{ChatWindow/isFocused}
                []
                    chat window should be focused
            {Test/assert}
                []
                    @testEnv
                    .{ChatWindowManager/newMessageChatWindow}
                    .{ChatWindow/chatWindowComponents}
                    .{Collection/first}
                    .{ChatWindowComponent/newMessageFormInput}
                    .{=}
                        {web.Browser/document}
                        .{web.Document/activeElement}
                []
                    chat window focused = selection input focused
`;

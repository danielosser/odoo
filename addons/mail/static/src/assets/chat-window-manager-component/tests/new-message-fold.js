/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Test}
        [Test/name]
            new message: fold
        [Test/model]
            ChatWindowManagerComponent
        [Test/assertions]
            6
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
                    .{ChatWindow/isFolded}
                    .{isFalsy}
                []
                    chat window should not be folded by default
            {Test/assert}
                []
                    @testEnv
                    .{ChatWindowManager/newMessageChatWindow}
                    .{ChatWindow/chatWindowComponents}
                    .{Collection/first}
                    .{ChatWindowComponent/newMessageForm}
                []
                    chat window should have new message form

            @testEnv
            .{Component/afterNextRender}
                {func}
                    @testEnv
                    .{UI/click}
                        @testEnv
                        .{ChatWindowManager/newMessageChatWindow}
                        .{ChatWindow/chatWindowHeaderComponents}
                        .{Collection/first}
            {Test/assert}
                []
                    @testEnv
                    .{ChatWindowManager/newMessageChatWindow}
                    .{ChatWindow/isFolded}
                []
                    chat window should become folded
            {Test/assert}
                []
                    @testEnv
                    .{ChatWindowManager/newMessageChatWindow}
                    .{ChatWindow/chatWindowComponents}
                    .{Collection/first}
                    .{ChatWindowComponent/newMessageForm}
                    .{isFalsy}
                []
                    chat window should not have new message form

            @testEnv
            .{Component/afterNextRender}
                {func}
                    @testEnv
                    .{UI/click}
                        @testEnv
                        .{ChatWindowManager/newMessageChatWindow}
                        .{ChatWindow/chatWindowHeaderComponents}
                        .{Collection/first}
            {Test/assert}
                []
                    @testEnv
                    .{ChatWindowManager/newMessageChatWindow}
                    .{ChatWindow/isFolded}
                    .{isFalsy}
                []
                    chat window should become unfolded
            {Test/assert}
                []
                    @testEnv
                    .{ChatWindowManager/newMessageChatWindow}
                    .{ChatWindow/chatWindowComponents}
                    .{Collection/first}
                    .{ChatWindowComponent/newMessageForm}
                []
                    chat window should have new message form
`;

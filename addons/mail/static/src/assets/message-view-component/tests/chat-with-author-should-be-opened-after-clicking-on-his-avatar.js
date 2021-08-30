/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Test}
        [Test/name]
            chat with author should be opened after clicking on his avatar
        [Test/model]
            MessageViewComponent
        [Test/assertions]
            4
        [Test/scenario]
            :testEnv
                {Record/insert}
                    [Record/traits]
                        Env
            @testEnv
            .{Record/insert}
                []
                    [Record/traits]
                        res.partner
                    [res.partner/id]
                        10
                []
                    [Record/traits]
                        res.users
                    [res.users/partner_id]
                        10
            @testEnv
            .{Record/insert}
                [Record/traits]
                    Server
                [Server/data]
                    @record
                    .{Test/data}
            :message
                @testEnv
                .{Record/insert}
                    [Record/traits]
                        Message
                    [Message/author]
                        @testEnv
                        .{Record/insert}
                            [Record/traits]
                                Partner
                            [Partner/id]
                                10
                    [Message/id]
                        10
            @testEnv
            .{Record/insert}
                []
                    [Record/traits]
                        ChatWindowManagerComponent
                []
                    [Record/traits]
                        MessageViewComponent
                    [MessageViewComponent/message]
                        @message
            {Test/assert}
                [0]
                    @record
                [1]
                    @message
                    .{Message/messageComponents}
                    .{Collection/first}
                    .{MessageViewComponent/authorAvatar}
                [2]
                    message should have the author avatar
            {Test/assert}
                [0]
                    @record
                [1]
                    @message
                    .{Message/messageComponents}
                    .{Collection/first}
                    .{MessageViewComponent/hasAuthorOpenChat}
                [2]
                    author avatar should have the redirect style

            @testEnv
            .{Component/afterNextRender}
                {func}
                    @testEnv
                    .{UI/click}
                        @message
                        .{Message/messageComponents}
                        .{Collection/first}
                        .{MessageViewComponent/authorAvatar}
            {Test/assert}
                [0]
                    @record
                [1]
                    @testEnv
                    .{ChatWindowManager/chatWindows}
                    .{Collection/first}
                    .{ChatWindow/thread}
                [2]
                    chat window with thread should be opened after clicking on author avatar
            {Test/assert}
                [0]
                    @record
                [1]
                    @testEnv
                    .{ChatWindowManager/chatWindows}
                    .{Collection/first}
                    .{ChatWindow/thread}
                    .{Thread/correspondent}
                    .{=}
                        @message
                        .{Message/author}
                [2]
                    chat with author should be opened after clicking on his avatar
`;

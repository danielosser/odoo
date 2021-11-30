/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Test}
        [Test/name]
            message should not be considered as "clicked" after clicking on its author name
        [Test/model]
            MessageViewComponent
        [Test/assertions]
            1
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
                            [Partner/displayName]
                                Demo User
                            [Partner/id]
                                7
                    [Message/body]
                        <p>Test</p>
                    [Message/id]
                        100
            @testEnv
            .{Record/insert}
                [Record/traits]
                    MessageViewComponent
                [MessageViewComponent/message]
                    @message
            @testEnv
            .{UI/click}
                @message
                .{Message/messageComponents}
                .{Collection/first}
                .{MessageViewComponent/authorName}
            {Utils/nextAnimationFrame}
            {Test/assert}
                [0]
                    @record
                [1]
                    @message
                    .{Message/messageComponents}
                    .{Collection/first}
                    .{MessageViewComponent/isClicked}
                    .{isFalsy}
                [2]
                    message should not be considered as 'clicked' after clicking on its author name
`;

/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Test}
        [Test/name]
            subtype description should be displayed if it is different than body
        [Test/model]
            MessageViewComponent
        [Test/assertions]
            2
        [Test/scenario]
            :testEnv
                {Record/insert}
                    [Record/traits]
                        Env
            :server
                @testEnv
                {Record/insert}
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
                    [Message/body]
                        <p>Hello</p>
                    [Message/id]
                        100
                    [Message/subtypeDescription]
                        Bonjour
            @testEnv
            .{Record/insert}
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
                    .{MessageViewComponent/content}
                [2]
                    message should have content
            {Test/assert}
                [0]
                    @record
                [1]
                    @message
                    .{Message/messageComponents}
                    .{Collection/first}
                    .{MessageViewComponent/content}
                    .{web.Element/textContent}
                    .{=}
                        HelloBonjour
                [2]
                    message content should display both body and subtype description when they are different
`;

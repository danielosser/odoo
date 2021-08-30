/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Test}
        [Test/name]
            load single message from channel initially
        [Test/model]
            DiscussComponent
        [Test/assertions]
            6
        [Test/scenario]
            {Dev/comment}
                channel expected to be rendered, with a random unique id that will
                be referenced in the test
            :testEnv
                {Record/insert}
                    [Record/traits]
                        Env
            @testEnv
            .{Record/insert}
                [0]
                    [Record/traits]
                        mail.channel
                    [mail.channel/id]
                        20
                [1]
                    [Record/traits]
                        mail.message
                    [mail.message/body]
                        not empty
                    [mail.message/date]
                        2019-04-20 10:00:00
                    [mail.message/id]
                        100
                    [mail.message/model]
                        mail.channel
                    [mail.message/res_id]
                        20
            @testEnv
            .{Record/insert}
                [Record/traits]
                    Server
                [Server/data]
                    @record
                    .{Test/data}
                [Server/mockRPC]
                    {func}
                        [in]
                            route
                            args
                            original
                        [out]
                            {if}
                                @route
                                .{=}
                                    /mail/channel/messages
                            .{then}
                                {Test/assert}
                                    [0]
                                        @record
                                    [1]
                                        @args
                                        .{Dict/get}
                                            limit
                                        .{=}
                                            30
                                    [2]
                                        should fetch up to 30 messages
                            @original
            @testEnv
            .{Record/insert}
                [Record/traits]
                    DiscussComponent
            @testEnv
            .{Thread/open}
                @testEnv
                .{Record/findById}
                    [Thread/id]
                        20
                    [Thread/model]
                        mail.channel
            {Test/assert}
                [0]
                    @record
                [1]
                    @testEnv
                    .{Discuss/thread}
                    .{Thread/threadViews}
                    .{Collection/first}
                    .{ThreadView/messageListComponents}
                    .{Collection/length}
                    .{=}
                        1
                [2]
                    should have list of messages
            {Test/assert}
                [0]
                    @record
                [1]
                    @testEnv
                    .{Discuss/thread}
                    .{Thread/threadViews}
                    .{Collection/first}
                    .{ThreadView/messageListComponents}
                    .{Collection/first}
                    .{MessageListComponent/separatorDate}
                    .{Collection/length}
                    .{=}
                        1
                [2]
                    should have a single date separator
                    {Dev/comment}
                        to check: may be client timezone dependent
            {Test/assert}
                [0]
                    @record
                [1]
                    @testEnv
                    .{Discuss/thread}
                    .{Thread/threadViews}
                    .{Collection/first}
                    .{ThreadView/messageListComponents}
                    .{Collection/length}
                    .{MessageListComponent/separatorDate}
                    .{Collection/first}
                    .{web.Element/textContent}
                    .{=}
                        April 20, 2019
                [2]
                    should display date day of messages
            {Test/assert}
                [0]
                    @record
                [1]
                    @testEnv
                    .{Discuss/thread}
                    .{Thread/cache}
                    .{ThreadCache/messages}
                    .{Collection/length}
                    .{=}
                        1
                [2]
                    should have a single message
            {Test/assert}
                [0]
                    @record
                [1]
                    @testEnv
                    .{Record/findById}
                        [Message/id]
                            100
                    .{Message/messageComponents}
                    .{Collection/length}
                    .{=}
                        1
                [2]
                    should have message with Id 100
`;

/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Test}
        [Test/name]
            should not display user notification messages
        [Test/model]
            ChatterComponent
        [Test/assertions]
            1
        [Test/scenario]
            :testEnv
                {Record/insert}
                    [Record/traits]
                        Env
            @testEnv
            .{Record/insert}
                [0]
                    [Record/traits]
                        mail.message
                    [mail.message/id]
                        102
                    [mail.message/message_type]
                        user_notification
                    [mail.message/model]
                        res.partner
                    [mail.message/res_id]
                        100
                [1]
                    [Record/traits]
                        res.partner
                    [res.partner/id]
                        100
            @testEnv
            .{Record/insert}
                [Record/traits]
                    Server
                [Server/data]
                    @record
                    .{Test/data}
            :chatter
                @testEnv
                .{Record/insert}
                    [Record/traits]
                        Chatter
                    [Chatter/id]
                        11
                    [Chatter/threadId]
                        100
                    [Chatter/threadModel]
                        res.partner
            @testEnv
            .{Record/insert}
                [Record/traits]
                    ChatterComponent
                [ChatterComponent/chatter]
                    @chatter
            {Test/assert}
                []
                    @chatter
                    .{Chatter/thread}
                    .{Thread/cache}
                    .{ThreadCache/messages}
                    .{Collection/first}
                    .{Message/messageComponents}
                    .{Collection/length}
                    .{=}
                        0
                []
                    should display no messages
`;

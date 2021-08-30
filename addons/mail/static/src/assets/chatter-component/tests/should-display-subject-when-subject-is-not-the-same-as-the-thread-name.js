/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Test}
        [Test/name]
            should display subject when subject is not the same as the thread name
        [Test/model]
            ChatterComponent
        [Test/assertions]
            2
        [Test/scenario]
            :testEnv
                {Record/insert}
                    [Record/traits]
                        Env
            @testEnv
            .{Record/insert}
                [0]
                    [Record/traits]
                        res.partner
                    [res.partner/id]
                        100
                [1]
                    [Record/traits]
                        mail.message
                    [mail.message/body]
                        not empty
                    [mail.message/model]
                        res.partner
                    [mail.message/res_id]
                        100
                    [mail.message/subject]
                        Salutations, voyageur
            @testEnv
            .{Record/insert}
                [Record/traits]
                    Server
                [Server/data]
                    @record
                    .{Test/data}
            @testEnv
            .{Record/insert}
                [Record/traits]
                    Thread
                [Thread/id]
                    100
                [Thread/model]
                    res.partner
                [Thread/name]
                    voyageur
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
                    .{Collection/first}
                    .{MessageViewComponent/subject}
                []
                    should display subject of the message
            {Test/assert}
                []
                    @chatter
                    .{Chatter/thread}
                    .{Thread/cache}
                    .{ThreadCache/messages}
                    .{Collection/first}
                    .{Message/messageComponents}
                    .{Collection/first}
                    .{MessageViewComponent/subject}
                    .{web.Element/textContent}
                    .{=}
                        Subject: Salutations, voyageur
                []
                    Subject of the message should be 'Salutations, voyageur'
`;

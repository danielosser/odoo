/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Test}
        [Test/name]
            receive other member typing status "is typing"
        [Test/model]
            ThreadTextualTypingStatusComponent
        [Test/assertions]
            2
        [Test/scenario]
            :testEnv
                {Record/insert}
                    [Record/traits]
                        Env
            @testEnv
            .{Record/insert}
                []
                    [Record/traits]
                        mail.channel
                    [mail.channel/id]
                        20
                    [mail.channel/members]
                        [0]
                            @record
                            .{Test/data}
                            .{Data/currentPartnerId}
                        [1]
                            17
                []
                    [Record/traits]
                        res.partner
                    [res.partner/id]
                        17
                    [res.partner/name]
                        Demo
            @testEnv
            .{Record/insert}
                [Record/traits]
                    Server
                [Server/data]
                    @record
                    .{Test/data}
            :thread
                @testEnv
                .{Record/findById}
                    [Thread/id]
                        20
                    [Thread/model]
                        mail.channel
            @testEnv
            .{Record/insert}
                [Record/traits]
                    ThreadTextualTypingStatusComponent
                [ThreadTextualTypingStatusComponent/thread]
                    @thread
            {Test/assert}
                [0]
                    @record
                [1]
                    @thread
                    .{Thread/threadTextualTypingStatusComponents}
                    .{Collection/first}
                    .{web.Element/textContent}
                    .{=}
                        {String/empty}
                [2]
                    Should display no one is currently typing

            {Dev/comment}
                simulate receive typing notification from demo
            @testEnv
            .{Component/afterNextRender}
                {func}
                    @testEnv
                    .{Env/owlEnv}
                    .{Dict/get}
                        services
                    .{Dict/get}
                        bus_service
                    .{Dict/get}
                        trigger
                    .{Function/call}
                        [0]
                            notification
                        [1]
                            [type]
                                mail.channel.partner/typing_status
                            [payload]
                                [channel_id]
                                    20
                                [is_typing]
                                    true
                                [partner_id]
                                    17
                                [partner_name]
                                    Demo
            {Test/assert}
                [0]
                    @record
                [1]
                    @thread
                    .{Thread/threadTextualTypingStatusComponents}
                    .{Collection/first}
                    .{web.Element/textContent}
                    .{=}
                        Demo is typing...
                [2]
                    Should display that demo user is typing
`;

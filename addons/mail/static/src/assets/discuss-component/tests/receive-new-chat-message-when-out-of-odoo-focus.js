/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Test}
        [Test/name]
            receive new chat message: out of odoo focus
        [Test/model]
            DiscussComponent
        [Test/assertions]
            4
        [Test/scenario]
            {Dev/comment}
                channel expected to be found in the sidebar
                with a random unique id that will be referenced in the test
            :bus
                {Record/insert}
                    [Record/traits]
                        Bus
            {Bus/on}
                [0]
                    @bus
                [1]
                    set_title_part
                [2]
                    null
                [3]
                    {func}
                        [in]
                            payload
                        [out]
                            {Test/step}
                                set_title_part
                            {Test/assert}
                                @payload
                                .{Dict/get}
                                    part
                                .{=}
                                    _chat
                            {Test/assert}
                                @payload
                                .{Dict/get}
                                    title
                                .{=}
                                    1 Message
            :testEnv
                {Record/insert}
                    [Record/traits]
                        Env
                    [Env/owlEnv]
                        [bus]
                            @bus
                        [services]
                            [bus_service]
                                {Record/insert}
                                    [Record/traits]
                                        BusService
                                    [_beep]
                                        {func}
                                            {Dev/comment}
                                                Do nothing
                                    [_poll]
                                        {func}
                                            {Dev/comment}
                                                Do nothing
                                    [_registerWindowUnload]
                                        {func}
                                            {Dev/comment}
                                                Do nothing
                                    [isOdooFocused]
                                        false
                                    [updateOption]
                                        {func}
            @testEnv
            .{Record/insert}
                [Record/traits]
                    mail.channel
                [mail.channel/channel_type]
                    chat
                [mail.channel/id]
                    20
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
                    DiscussComponent
            {Dev/comment}
                simulate receiving a new message with odoo focused
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
                                mail.channel/new_message
                            [payload]
                                [id]
                                    10
                                [message]
                                    [id]
                                        126
                                    [model]
                                        mail.channel
                                    [res_id]
                                        10
            {Test/verifySteps}
                set_title_part
`;

/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Test}
        [Test/name]
            initially load messages from inbox
        [Test/model]
            DiscussComponent
        [Test/assertions]
            3
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
                [Server/mockRPC]
                    {func}
                        [in]
                            route
                            args
                        [out]
                            {if}
                                @route
                                .{=}
                                    /mail/inbox/messages
                            .{then}
                                {Test/step}
                                    /mail/channel/messages
                                {Test/assert}
                                    []
                                        @args
                                        .{Dict/get}
                                            limit
                                        .{=}
                                            30
                                    []
                                        should fetch up to 30 messages
                            @original
            @testEnv
            .{Record/insert}
                [Record/traits]
                    DiscussComponent
            {Test/verifySteps}
                /mail/channel/messages
`;

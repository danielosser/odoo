/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Test}
        [Test/name]
            messaging becomes initialized
        [Test/model]
            DiscussComponent
        [Test/assertions]
            2
        [Test/scenario]
            :messagingInitialized
                {Record/insert}
                    [Record/traits]
                        Deferred
            :testEnv
                {Record/insert}
                    [Record/traits]
                        Env
                    [Env/waitUntilMessagingCondition]
                        created
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
                                    /mail/init_messaging
                            .{then}
                                {Promise/await}
                                    @messagingInitialized
                            @original
            @testEnv
            .{Record/insert}
                [Record/traits]
                    DiscussComponent
            {Test/assert}
                [0]
                    @record
                [1]
                    @testEnv
                    .{Discuss/discussComponents}
                    .{Collection/first}
                    .{DiscussComponent/messagingNotInitialized}
                [2]
                    should display messaging not initialized

            @testEnv
            .{Component/afterNextRender}
                {func}
                    {Promise/resolve}
                        @messagingInitialized
            {Test/assert}
                [0]
                    @record
                [1]
                    @testEnv
                    .{Discuss/discussComponents}
                    .{Collection/first}
                    .{DiscussComponent/messagingNotInitialized}
                    .{isFalsy}
                [2]
                    should no longer display messaging not initialized
`;

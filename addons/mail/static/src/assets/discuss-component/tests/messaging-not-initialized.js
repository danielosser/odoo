/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Test}
        [Test/name]
            messaging not initialized
        [Test/model]
            DiscussComponent
        [Test/assertions]
            1
        [Test/scenario]
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
                                {Dev/comment}
                                    simulate messaging never initialized
                                {Promise/await}
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
`;

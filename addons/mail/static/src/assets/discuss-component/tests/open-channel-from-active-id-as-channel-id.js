/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Test}
        [Test/name]
            open channel from active_id as channel id
        [Test/model]
            DiscussComponent
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
                    mail.channel
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
                    .{=}
                        @testEnv
                        .{Record/findById}
                            [Thread/id]
                                20
                            [Thread/model]
                                mail.channel
                [2]
                    should have channel with ID 20 open in Discuss when providing active_id 20
`;

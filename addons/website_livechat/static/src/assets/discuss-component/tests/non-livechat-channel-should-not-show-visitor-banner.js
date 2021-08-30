/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Test}
        [Test/name]
            non-livechat channel should not show visitor banner
        [Test/feature]
            website_livechat
        [Test/model]
            DiscussComponent
        [Test/assertions]
            2
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
                    11
                [mail.channel/name]
                    General
            @testEnv
            .{Record/insert}
                [Record/traits]
                    Server
                [Server/data]
                    @recod
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
                        11
                    [Thread/model]
                        mail.channel
            {Test/assert}
                [0]
                    @record
                [1]
                    @testEnv
                    .{Record/findById}
                        [Thread/id]
                            11
                        [Thread/model]
                            mail.channel
                    .{Thread/threadViews}
                    .{Collection/length}
                    .{=}
                        1
                [2]
                    should have a message list
            {Test/assert}
                [0]
                    @record
                [1]
                    @testEnv
                    .{Discuss/discussComponents}
                    .{Collection/first}
                    .{DiscussComponent/visitorBanner}
                    .{isFalsy}
                [2]
                    should not have any visitor banner
`;

/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Test}
        [Test/name]
            no show more 3 or less suggested recipients
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
                        res.fake
                    [res.fake/email_cc]
                        john@test.be
                    [res.fake/id]
                        10
                    [res.fake/partner_ids]
                        100
                [1]
                    [Record/traits]
                        res.partner
                    [res.partner/display_name]
                        John Jane
                    [res.partner/email]
                        john@jane.be
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
                        10
                    [Chatter/threadModel]
                        res.fake
            @testEnv
            .{Record/insert}
                [Record/traits]
                    ChatterComponent
                [ChatterComponent/chatter]
                    @chatter
            @testEnv
            .{Component/afterNextRender}
                {func}
                    @testEnv
                    .{UI/click}
                        @chatter
                        .{Chatter/chatterTopbarComponents}
                        .{Collection/first}
                        .{ChatterTopbarComponent/buttonSendMessage}
            {Test/assert}
                []
                    @testEnv
                    .{Record/all}
                        [Record/traits]
                            ComposerSuggestedRecipientListComponent
                    .{Collection/first}
                    .{ComposerSuggestedRecipientListComponent/showMore}
                    .{isFalsy}
                []
                    should not display 'show more' button with 3 or less suggested recipients
`;

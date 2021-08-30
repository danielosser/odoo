/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Test}
        [Test/name]
            more than 3 suggested recipients -> click "show more" -> "show less" button
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
                    [res.fake/id]
                        10
                    [res.fake/partner_ids]
                        100
                        1000
                        1001
                        1002
                [1]
                    [Record/traits]
                        res.partner
                    [res.partner/display_name]
                        John Jane
                    [res.partner/email]
                        john@jane.be
                    [res.partner/id]
                        100
                [2]
                    [Record/traits]
                        res.partner
                    [res.partner/display_name]
                        Jack Jone
                    [res.partner/email]
                        jack@jone.be
                    [res.partner/id]
                        1000
                [3]
                    [Record/traits]
                        res.partner
                    [res.partner/display_name]
                        jolly Roger
                    [res.partner/email]
                        Roger@skullflag.com
                    [res.partner/id]
                        1001
                [4]
                    [Record/traits]
                        res.partner
                    [res.partner/display_name]
                        jack sparrow
                    [res.partner/email]
                        jsparrow@blackpearl.bb
                    [res.partner/id]
                        1002
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
            @testEnv
            .{Component/afterNextRender}
                {func}
                    @testEnv
                    .{UI/click}
                        @chatter
                        .{Chatter/thread}
                        .{Thread/composerSuggestedRecipientListComponents}
                        .{Collection/first}
                        .{ComposerSuggestedRecipientListComponent/showMore}
            {Test/assert}
                []
                    @chatter
                    .{Chatter/thread}
                    .{Thread/composerSuggestedRecipientListComponents}
                    .{Collection/first}
                    .{ComposerSuggestedRecipientListComponent/showLess}
                []
                    more than 3 suggested recipients -> click 'show more' -> 'show less' button
`;

/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Test}
        [Test/name]
            attachment loading is delayed
        [Test/model]
            ChatterTopbarComponent
        [Test/assertions]
            4
        [Test/scenario]
            :testEnv
                {Record/insert}
                    [Record/traits]
                        Env
                    [Env/loadingBaseDelayDuration]
                        100
                    [Env/usingTimeControl]
                        true
            @testEnv
            .{Record/insert}
                [Record/traits]
                    res.partner
                [res.partner/id]
                    100
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
                                .{String/includes}
                                    ir.attachment/search_read
                            .{then}
                                {Dev/comment}
                                    simulate long loading
                                {Promise/await}
                                    {Record/insert}
                                        [Record/traits]
                                            Deferred
                            @original
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
                    ChatterTopbarComponent
                [ChatterTopbarComponent/chatter]
                    @chatter
            {Test/assert}
                []
                    @chatter
                    .{Chatter/chatterTopbarComponents}
                    .{Collection/length}
                    .{=}
                        1
                []
                    should have a chatter topbar
            {Test/assert}
                []
                    @chatter
                    .{Chatter/chatterTopbarComponents}
                    .{Collection/first}
                    .{ChatterTopbarComponent/buttonAttachments}
                []
                    should have an attachments button in chatter menu
            {Test/assert}
                []
                    @chatter
                    .{Chatter/chatterTopbarComponents}
                    .{Collection/first}
                    .{ChatterTopbarComponent/buttonAttachmentsCountLoader}
                    .{isFalsy}
                []
                    attachments button should not have a loader yet

            @testEnv
            .{Component/afterNextRender}
                {func}
                    @testEnv
                    .{Time/advance}
                        100
            {Test/assert}
                []
                    @chatter
                    .{Chatter/chatterTopbarComponents}
                    .{Collection/first}
                    .{ChatterTopbarComponent/buttonAttachmentsCountLoader}
                []
                    attachments button should now have a loader
`;

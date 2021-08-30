/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Test}
        [Test/name]
            attachment counter with attachments
        [Test/model]
            ChatterTopbarComponent
        [Test/assertions]
            4
        [Test/scenario]
            :testEnv
                {Record/insert}
                    [Record/traits]
                        Env
            @testEnv
            .{Record/insert}
                [0]
                    [Record/traits]
                        ir.attachment
                    [ir.attachment/mimetype]
                        text/plain
                    [ir.attachment/name]
                        Blah.txt
                    [ir.attachment/res_id]
                        100
                    [ir.attachment/res_model]
                        res.partner
                [1]
                    [Record/traits]
                        ir.attachment
                    [ir.attachment/mimetype]
                        text/plain
                    [ir.attachment/name]
                        Blu.txt
                    [ir.attachment/res_id]
                        100
                    [ir.attachment/res_model]
                        res.partner
                [2]
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
                    .{ChatterTopbarComponent/buttonAttachmentsCount}
                []
                    attachments button should have a counter
            {Test/assert}
                []
                    @chatter
                    .{Chatter/chatterTopbarComponents}
                    .{Collection/first}
                    .{ChatterTopbarComponent/buttonAttachmentsCount}
                    .{web.Element/textContent}
                    .{=}
                        2
                []
                    attachment counter should contain "2"
`;

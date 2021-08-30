/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Test}
        [Test/name]
            base rendering attachments
        [Test/model]
            ChatterComponent
        [Test/assertions]
            3
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
                    ChatterComponent
                [ChatterComponent/chatter]
                    @chatter
            {Test/assert}
                []
                    @chatter
                    .{Chatter/chatterComponents}
                    .{Collection/length}
                    .{=}
                        1
                []
                    should have a chatter
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
                    .{Chatter/chatterComponents}
                    .{Collection/first}
                    .{ChatterComponent/attachmentBox}
                    .{isFalsy}
                []
                    should not have an attachment box in the chatter
`;

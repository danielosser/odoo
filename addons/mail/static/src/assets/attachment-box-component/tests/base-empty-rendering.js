/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Test}
        [Test/name]
            base empty rendering
        [Test/model]
            AttachmentBoxComponent
        [Test/assertions]
            4
        [Test/scenario]
            :testEnv
                {Record/insert}
                    [Record/traits]
                        Env
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
            :thread
                @testEnv
                .{Record/insert}
                    [Record/traits]
                        Thread
                    [Thread/id]
                        100
                    [Thread/model]
                        res.partner
            :chatter
                @testEnv
                .{Record/insert}
                    [Record/traits]
                        Chatter
                    [Chatter/id]
                        1
                    [Chatter/isAttachmentBoxVisibleInitially]
                        true
                    [Chatter/threadId]
                        @thread
                        .{Thread/id}
                    [Chatter/threadModel]
                        @thread
                        .{Thread/model}
            @testEnv
            .{Record/insert}
                [Record/traits]
                    AttachmentBoxComponent
                [AttachmentBoxComponent/attachmentBoxView]
                    @chatter
                    .{Chatter/attachmentBoxView}
            {Test/assert}
                []
                    @thread
                    .{Thread/attachmentBoxComponents}
                    .{Collection/length}
                    .{=}
                        1
                []
                    should have an attachment box
            {Test/assert}
                []
                    @thread
                    .{Thread/attachmentBoxComponents}
                    .{Collection/first}
                    .{AttachmentBoxComponent/buttonAdd}
                []
                    should have a button add
            {Test/assert}
                []
                    @thread
                    .{Thread/attachmentBoxComponents}
                    .{Collection/first}
                    .{AttachmentBoxComponent/fileUploader}
                    .{FileUploaderComponent/input}
                []
                    should have a file input
            {Test/assert}
                []
                    @thread
                    .{Thread/attachments}
                    .{Collection/length}
                    .{=}
                        0
                []
                    should not have any attachment
`;

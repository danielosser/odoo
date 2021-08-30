/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Test}
        [Test/name]
            auto layout with image
        [Test/model]
            AttachmentImageComponent
        [Test/assertions]
            3
        [Test/scenario]
            :server
                {Record/insert}
                    [Record/traits]
                        Server
                    [Server/data]
                        @test
                        .{Test/data}
            :testEnv
                {Record/insert}
                    [Record/traits]
                        Env
                    [Env/server]
                        @server
            :attachment
                @testEnv
                .{Record/insert}
                    [Record/traits]
                        Attachment
                    [Attachment/filename]
                        test.png
                    [Attachment/id]
                        750
                    [Attachment/mimetype]
                        image/png
                    [Attachment/name]
                        test.png
            :message
                @testEnv
                .{Record/insert}
                    [Record/traits]
                        Message
                    [Message/attachments]
                        {Field/add}
                            @attachment
                    [Message/author]
                        {Env/currentPartner}
                    [Message/body]
                        <p>Test</p>
                    [Message/id]
                        100
            @testEnv
            .{Record/insert}
                [Record/traits]
                    MessageViewComponent
                [MessageViewComponent/message]
                    @message
            {Test/assert}
                [0]
                    @test
                [1]
                    @testEnv
                    .{Record/findById}
                        [Attachment/id]
                            750
                    .{Attachment/attachmentImages}
                    .{Collection/first}
                    .{AttachmentImage/attachmentImageComponents}
                    .{Collection/first}
                    .{AttachmentImageComponent/image}
                [2]
                    attachment should have an image part
            {Test/assert}
                [0]
                    @test
                [1]
                    @testEnv
                    .{Record/findById}
                        [Attachment/id]
                            750
                    .{Attachment/attachmentImages}
                    .{Collection/first}
                    .{AttachmentImage/attachmentImageComponents}
                    .{Collection/first}
                    .{AttachmentImageComponent/imageOverlay}
                [2]
                    attachment should have an image overlay part
            {Test/assert}
                [0]
                    @test
                [1]
                    @testEnv
                    .{Record/findById}
                        [Attachment/id]
                            750
                    .{Attachment/attachmentImages}
                    .{Collection/first}
                    .{AttachmentImage/attachmentImageComponents}
                    .{Collection/first}
                    .{AttachmentImageComponent/aside}
                [2]
                    attachment should not have an aside element
`;

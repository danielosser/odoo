/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Test}
        [Test/name]
            prevent attachment delete on non-authored message
        [Test/model]
            MessageViewComponent
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
                    Server
                [Server/data]
                    @record
                    .{Test/data}
            :message
                @testEnv
                .{Record/insert}
                    [Record/traits]
                        Message
                    [Message/attachments]
                        @testEnv
                        .{Record/insert}
                            [Record/traits]
                                Attachment
                            [Attachment/filename]
                                BLAH.jpg
                            [Attachment/id]
                                10
                            [Attachment/name]
                                BLAH
                            [Attachment/mimetype]
                                image/jpeg
                    [Message/author]
                        @testEnv
                        .{Record/insert}
                            [Record/traits]
                                Partner
                            [Partner/displayName]
                                Guy
                            [Partner/id]
                                11
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
                    @record
                [1]
                    @message
                    .{Message/attachments}
                    .{Collection/length}
                    .{=}
                        1
                [2]
                    should have an attachment
            {Test/assert}
                [0]
                    @record
                [1]
                    @message
                    .{Message/attachments}
                    .{Collection/first}
                    .{Attachment/attachmentImages}
                    .{Collection/first}
                    .{AttachmentImage/attachmentImageComponents}
                    .{Collection/first}
                    .{AttachmentImageComponent/asideItemUnlink}
                    .{isFalsy}
                [2]
                    delete attachment button should not be printed
`;

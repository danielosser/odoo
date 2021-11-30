/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Test}
        [Test/name]
            view attachment
        [Test/model]
            AttachmentListComponent
        [Test/assertions]
            3
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
            @testEnv
            .{Record/insert}
                [Record/traits]
                    DialogManagerComponent
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
                        @testEnv
                        .{Env/currentPartner}
                    [Message/body]
                        <p>Test</p>
                    [Message/id]
                        100
            @testEnv
            .{Record/insert}
                [Record/traits]
                    MessageViewComponent
                [MessageViewComponent/messageView]
                    {Record/insert}
                        [Record/traits]
                            MessageView
                        [MessageView/message]
                            @message
            {Test/assert}
                []
                    @testEnv
                    .{Record/all}
                        [Record/traits]
                            AttachmentImageComponent
                    .{Collection/first}
                    .{AttachmentImageComponent/image}
                []
                    attachment should have an image part

            @testEnv
            .{UI/afterNextRender}
                @testEnv
                .{UI/click}
                    @testEnv
                    .{Record/all}
                        [Record/traits]
                            AttachmentImageComponent
                    .{Collection/first}
            {Test/assert}
                []
                    @testEnv
                    .{DialogManager/dialogs}
                    .{Collection/length}
                    .{=}
                        1
                []
                    a dialog should have been opened once attachment image is clicked
            {Test/assert}
                []
                    @testEnv
                    .{DialogManager/dialogs}
                    .{Collection/first}
                    .{Dialog/attachmentViewer}
                []
                    an attachment viewer should have been opened once attachment image is clicked
`;

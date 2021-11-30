/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Test}
        [Test/name]
            layout with card details and filename and extension
        [Test/model]
            AttachmentListComponent
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
            :attachment
                @testEnv
                .{Record/insert}
                    [Record/traits]
                        Attachment
                    [Attachment/filename]
                        test.txt
                    [Attachment/id]
                        750
                    [Attachment/mimetype]
                        text/plain
                    [Attachment/name]
                        test.txt
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
                            MessagView
                        [MessageView/message]
                            @message
            {Test/assert}
                []
                    @testEnv
                    .{Record/all}
                        [Record/traits]
                            AttachmentCardComponent
                    .{Collection/first}
                    .{AttachmentCardComponent/details}
                []
                    attachment should have a details part
            {Test/assert}
                []
                    @testEnv
                    .{Record/all}
                        [Record/traits]
                            AttachmentCardComponent
                    .{Collection/first}
                    .{AttachmentCardComponent/extension}
                []
                    attachment should have its extension shown
`;

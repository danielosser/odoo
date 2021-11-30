/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Test}
        [Test/name]
            HTML file is viewable
        [Test/model]
            AttachmentListComponent
        [Test/assertions]
            1
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
                        test.html
                    [Attachment/id]
                        750
                    [Attachment/mimetype]
                        text/html
                    [Attachment/name]
                        test.html
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
                    @message
                    .{Message/attachments}
                    .{Collection/first}
                    .{Attachment/isViewable}
                []
                    should be viewable
`;

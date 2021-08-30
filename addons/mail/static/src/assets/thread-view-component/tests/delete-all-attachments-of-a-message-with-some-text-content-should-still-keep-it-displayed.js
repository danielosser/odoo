/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Test}
        [Test/name]
            delete all attachments of a message with some text content should still keep it displayed
        [Test/model]
            ThreadViewComponent
        [Test/assertions]
            2
        [Test/scenario]
            :testEnv
                {Record/insert}
                    [Record/traits]
                        Env
            @testEnv
            .{Record/insert}
                []
                    [Record/traits]
                        ir.attachment
                    [ir.attachment/id]
                        143
                    [ir.attachment/mimetype]
                        text/plain
                    [ir.attachment/name]
                        Blah.txt
                []
                    [Record/traits]
                        mail.channel
                    [mail.channel/id]
                        11
                []
                    [Record/traits]
                        mail.message
                    [mail.message/attachment_ids]
                        143
                    [mail.message/body]
                        Some content
                    [mail.message/id]
                        101
                    [mail.message/model]
                        mail.channel
                    [mail.message/res_id]
                        11
            @testEnv
            .{Record/insert}
                [Record/traits]
                    Server
                [Server/data]
                    @record
                    .{Test/data}
            :threadViewer
                @testEnv
                .{Record/insert}
                    [Record/traits]
                        ThreadViewer
                    [ThreadViewer/hasThreadView]
                        true
                    [ThreadViewer/thread]
                        @testEnv
                        .{Record/insert}
                            [Record/traits]
                                Thread
                            [Thread/id]
                                11
                            [Thread/model]
                                mail.channel
            {Dev/comment}
                wait for messages of the thread to be loaded
            @testEnv
            .{UI/afterEvent}
                [eventName]
                    o-thread-view-hint-processed
                [func]
                    @testEnv
                    .{Record/insert}
                        [Record/traits]
                            ThreadViewComponent
                        [ThreadViewComponent/threadView]
                            @threadViewer
                            .{ThreadViewer/threadView}
                [message]
                    thread become loaded with messages
                [predicate]
                    {func}
                        [in]
                            hint
                            threadViewer
                        [out]
                            @hint
                            .{Hint/type}
                            .{=}
                                messages-loaded
                            .{&}
                                @threadViewer
                                .{ThreadViewer/thread}
                                .{Thread/model}
                                .{=}
                                    mail.channel
                            .{&}
                                @threadViewer
                                .{ThreadViewer/thread}
                                .{Thread/id}
                                .{=}
                                    11
            {Test/assert}
                [0]
                    @record
                [1]
                    @threadViewer
                    .{ThreadViewer/threadView}
                    .{ThreadView/thread}
                    .{Thread/cache}
                    .{ThreadCache/messages}
                    .{Collection/length}
                    .{=}
                        1
                [2]
                    there should be 1 message displayed initially

            @testEnv
            .{Component/afterNextRender}
                {func}
                    @testEnv
                    .{UI/click}
                        @testEnv
                        .{Record/findById}
                            [Attachment/id]
                                143
                        .{Attachment/attachmentCards}
                        .{Collection/first}
                        .{AttachmentCard/attachmentCardComponents}
                        .{Collection/first}
                        .{AttachmentCardComponent/asideItemUnlink}
            @testEnv
            .{Component/afterNextRender}
                {func}
                    @testEnv
                    .{UI/click}
                        @testEnv
                        .{Record/findById}
                            [Attachment/id]
                                143
                        .{Attachment/attachmentDeleteConfirmDialogComponents}
                        .{Collection/first}
                        .{AttachmentDeleteConfirmDialogComponent/confirmButton}
            {Test/assert}
                [0]
                    @record
                [1]
                    @threadViewer
                    .{ThreadViewer/threadView}
                    .{ThreadView/thread}
                    .{Thread/cache}
                    .{ThreadCache/messages}
                    .{Collection/length}
                    .{=}
                        1
                [2]
                    message should still be displayed after removing its attachments (non-empty content)
`;

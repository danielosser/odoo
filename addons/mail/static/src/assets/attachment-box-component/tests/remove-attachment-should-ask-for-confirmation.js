/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Test}
        [Test/name]
            remove attachment should ask for confirmation
        [Test/model]
            AttachmentBoxComponent
        [Test/assertions]
            5
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
                    [Thread/attachments]
                        @testEnv
                        .{Field/add}
                            @testEnv
                            .{Record/insert}
                                [Record/traits]
                                    Attachment
                                [Attachment/id]
                                    143
                                [Attachment/mimetype]
                                    text/plain
                                [Attachment/name]
                                    Blah.txt
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
                    .{Thread/attachments}
                    .{Collection/length}
                    .{=}
                        1
                []
                    should have an attachment
            {Test/assert}
                []
                    @thread
                    .{Thread/attachments}
                    .{Collection/first}
                    .{Attachment/attachmentCards}
                    .{Collection/first}
                    .{AttachmentCard/attachmentCardComponents}
                    .{Collection/first}
                    .{AttachmentCardComponent/asideItemUnlink}
                []
                    attachment should have a delete button

            @testEnv
            .{Component/afterNextRender}
                {func}
                    @testEnv
                    .{UI/click}
                        @thread
                        .{Thread/attachments}
                        .{Collection/first}
                        .{Attachment/attachmentCards}
                        .{Collection/first}
                        .{AttachmentCard/attachmentCardComponents}
                        .{Collection/first}
                        .{AttachmentCardComponent/asideItemUnlink}
            {Test/assert}
                []
                    @thread
                    .{Thread/attachments}
                    .{Collection/first}
                    .{Attachment/attachmentDeleteConfirmDialogComponents}
                    .{Collection/length}
                    .{=}
                        1
                []
                    A confirmation dialog should have been opened
            {Test/assert}
                []
                    @thread
                    .{Thread/attachments}
                    .{Collection/first}
                    .{Attachment/attachmentDeleteConfirmDialogComponents}
                    .{Collection/first}
                    .{AttachmentDeleteConfirmDialogComponent/mainText}
                    .{web.Element/textContent}
                    .{=}
                        Do you really want to delete "Blah.txt"?
                []
                    Confirmation dialog should contain the attachment delete confirmation text

            {Dev/comment}
                Confirm the deletion
            @testEnv
            .{Component/afterNextRender}
                {func}
                    @testEnv
                    .{UI/click}
                        @thread
                        .{Thread/attachments}
                        .{Collection/first}
                        .{Attachment/attachmentDeleteConfirmDialogComponents}
                        .{Collection/first}
                        .{AttachmentDeleteConfirmDialogComponent/confirmButton}
            {Test/assert}
                []
                    @thread
                    .{Thread/attachments}
                    .{Collection/length}
                    .{=}
                        0
                []
                    should no longer have an attachment
`;

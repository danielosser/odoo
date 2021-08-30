/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        States the attachments to be displayed by this attachment list.
    {Field}
        [Field/name]
            attachments
        [Field/model]
            AttachmentList
        [Field/type]
            m2m
        [Field/target]
            Attachment
        [Field/inverse]
            Attachment/attachmentLists
        [Field/compute]
            {if}
                @record
                .{AttachmentList/message}
            .{then}
                @record
                .{AttachmentList/message}
                .{Message/attachments}
            .{elif}
                @record
                .{AttachmentList/chatter}
                .{&}
                    @record
                    .{AttachmentList/chatter}
                    .{Chatter/thread}
            .{then}
                @record
                .{AttachmentList/chatter}
                .{Chatter/thread}
                .{Thread/allAttachments}
            .{elif}
                @record
                .{AttachmentList/composerView}
                .{&}
                    @record
                    .{AttachmentList/composerView}
                    .{ComposerView/composer}
            .{then}
                @record
                .{AttachmentList/composerView}
                .{ComposerView/composer}
                .{Composer/attachments}
            .{else}
                {Record/empty}
`;

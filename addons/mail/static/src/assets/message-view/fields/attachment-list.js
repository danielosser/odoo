/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        Determines the attachment list displaying the attachments of this
        message (if any).
    {Field}
        [Field/name]
            attachmentList
        [Field/model]
            MessageView
        [Field/type]
            o2o
        [Field/target]
            AttachmentList
        [Field/isCausal]
            true
        [Field/isReadonly]
            true
        [Field/inverse]
            AttachmentList/messageView
        [Field/compute]
            {if}
                @record
                .{MessageView/message}
                .{&}
                    @record
                    .{MessageView/message}
                    .{Message/attachments}
                    .{Collection/length}
                    .{>}
                        0
            .{then}
                {Record/insert}
                    [Record/traits]
                        AttachmentList
            .{else}
                {Record/empty}
`;

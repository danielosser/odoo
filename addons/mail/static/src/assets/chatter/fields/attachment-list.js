/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        Determines the attachment list that will be used to display the attachments.
    {Field}
        [Field/name]
            attachmentList
        [Field/model]
            Chatter
        [Field/type]
            o2o
        [Field/target]
            AttachmentList
        [Field/isCausal]
            true
        [Field/isReadonly]
            true
        [Field/inverse]
            AttachmentList/chatter
        [Field/compute]
            {if}
                @record
                .{Chatter/thread}
                .{&}
                    @record
                    .{Chatter/thread}
                    .{Thread/allAttachments}
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

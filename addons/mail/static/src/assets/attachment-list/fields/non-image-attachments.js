/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        States the attachment that are not an image.
    {Field}
        [Field/name]
            nonImageAttachments
        [Field/model]
            AttachmentList
        [Field/type]
            m2m
        [Field/target]
            Attachment
        [Field/compute]
            @record
            .{AttachmentList/attachments}
            .{Collection/filter}
                [in]
                    item
                [out]
                    @item
                    .{Attachment/isImage}
                    .{isFalsy}
`;

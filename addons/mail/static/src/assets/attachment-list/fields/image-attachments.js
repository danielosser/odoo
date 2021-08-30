/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        States the attachment that are an image.
    {Field}
        [Field/name]
            imageAttachments
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
                {func}
                    [in]
                        item
                    [out]
                        @item
                        .{Attachment/isImage}
`;

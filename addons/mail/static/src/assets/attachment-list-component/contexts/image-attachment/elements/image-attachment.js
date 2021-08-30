/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            imageAttachment
        [Element/model]
            AttachmentListComponent:imageAttachment
        [Field/target]
            AttachmentImageComponent
        [Model/traits]
            AttachmentListComponent/attachment
        [AttachmentImageComponent/attachmentImage]
            @record
            .{AttachmentListComponent:imageAttachment/attachmentImage}
`;

/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            imageAttachmentForeach
        [Element/model]
            AttachmentListComponent
        [Model/traits]
            Foreach
        [Field/target]
            AttachmentListComponent:imageAttachment
        [Foreach/collection]
            {AttachmentListComponent/attachmentImages}
                @record
        [Foreach/as]
            attachmentImage
        [AttachmentListComponent:imageAttachment/attachmentImage]
            @field
            .{Foreach/get}
                attachmentImage
        [Element/key]
            @field
            .{Foreach/get}
                attachmentImage
            .{Record/id}
`;

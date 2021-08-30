/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            nonImageAttachment
        [Element/model]
            AttachmentListComponent:nonImageAttachment
        [Field/target]
            AttachmentCardComponent
        [Model/traits]
            AttachmentListComponent/attachment
        [AttachmentCardComponent/attachmentCard]
            @record
            .{AttachmentListComponent:nonImageAttachment/attachmentCard}
`;

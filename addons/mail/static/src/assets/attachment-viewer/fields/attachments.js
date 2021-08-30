/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            attachments
        [Field/model]
            AttachmentViewer
        [Field/type]
            m2m
        [Field/target]
            Attachment
        [Field/inverse]
            Attachment/attachmentViewer
        [Field/related]
            AttachmentViewer/attachmentList
            AttachmentList/viewableAttachments
`;

/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            attachmentViewer
        [Field/model]
            Attachment
        [Field/type]
            m2m
        [Field/target]
            AttachmentViewer
        [Field/inverse]
            AttachmentViewer/attachments
`;

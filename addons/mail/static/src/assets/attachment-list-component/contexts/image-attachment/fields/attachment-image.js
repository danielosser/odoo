/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            attachmentImage
        [Field/model]
            AttachmentListComponent:imageAttachment
        [Field/type]
            m2o
        [Field/target]
            AttachmentImage
        [Field/isRequired]
            true
`;

/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        Determines the attachment of this attachment image.
    {Field}
        [Field/name]
            attachment
        [Field/model]
            AttachmentImage
        [Field/type]
            m2o
        [Field/target]
            Attachment
        [Field/isRequired]
            true
        [Field/isReadonly]
            true
        [Field/inverse]
            Attachment/attachmentImages
`;

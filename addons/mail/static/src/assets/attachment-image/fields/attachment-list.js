/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        States the attachmentList displaying this attachment image.
    {Field}
        [Field/name]
            attachmentList
        [Field/model]
            AttachmentImage
        [Field/type]
            m2o
        [Field/target]
            AttachmentList
        [Field/isRequired]
            true
        [Field/isReadonly]
            true
        [Field/inverse]
            AttachmentList/attachmentImages
`;

/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            attachmentImage
        [Field/model]
            AttachmentImageComponent
        [Field/type]
            m2o
        [Field/target]
            AttachmentImage
        [Field/inverse]
            AttachmentImage/component
`;

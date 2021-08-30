/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            attachmentBoxView
        [Field/model]
            AttachmentBoxComponent
        [Field/type]
            m2o
        [Field/target]
            AttachmentBoxView
        [Field/isRequired]
            true
        [Field/inverse]
            AttachmentBoxView/component
`;

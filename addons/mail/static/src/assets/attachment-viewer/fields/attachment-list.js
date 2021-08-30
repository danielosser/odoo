/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            attachmentList
        [Field/model]
            AttachmentViewer
        [Field/type]
            m2o
        [Field/target]
            AttachmentList
        [Field/isRequired]
            true
        [Field/isReadonly]
            true
        [Field/inverse]
            AttachmentList/attachmentViewer
`;

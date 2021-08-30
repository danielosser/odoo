/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            attachmentList
        [Field/model]
            AttachmentListComponent
        [Field/type]
            m2o
        [Field/target]
            AttachmentList
        [Field/isRequired]
            true
`;

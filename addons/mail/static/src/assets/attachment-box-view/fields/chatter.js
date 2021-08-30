/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            chatter
        [Field/model]
            AttachmentBoxView
        [Field/type]
            o2o
        [Field/target]
            Chatter
        [Field/isRequired]
            true
        [Field/inverse]
            Chatter/attachmentBoxView
        [Field/isReadonly]
            true
`;

/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            message
        [Field/model]
            AttachmentList
        [Field/type]
            m2o
        [Field/target]
            Message
        [Field/related]
            AttachmentList/messageView
            MessageView/message
`;

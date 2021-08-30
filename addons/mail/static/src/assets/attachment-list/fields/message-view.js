/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        Link with a message view to handle attachments.
    {Field}
        [Field/name]
            messageView
        [Field/model]
            AttachmentList
        [Field/type]
            o2o
        [Field/target]
            MessageView
        [Field/isReadonly]
            true
        [Field/inverse]
            MessageView/attachmentList
`;

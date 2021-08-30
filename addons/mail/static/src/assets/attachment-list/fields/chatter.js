/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        Link with a chatter to handle attachments.
    {Field}
        [Field/name]
            chatter
        [Field/model]
            AttachmentList
        [Field/type]
            o2o
        [Field/target]
            Chatter
        [Field/isReadonly]
            true
        [Field/inverse]
            Chatter/attachmentList
`;

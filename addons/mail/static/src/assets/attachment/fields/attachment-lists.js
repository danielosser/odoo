/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        States the attachment lists that are displaying this attachment.
    {Field}
        [Field/name]
            attachmentLists
        [Field/model]
            Attachment
        [Field/type]
            m2m
        [Field/target]
            AttachmentList
        [Field/inverse]
            AttachmentList/attachments
`;

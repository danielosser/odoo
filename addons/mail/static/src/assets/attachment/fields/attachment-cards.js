/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        States the attachment cards that are displaying this attachment.
    {Field}
        [Field/name]
            attachmentCards
        [Field/model]
            Attachment
        [Field/type]
            o2m
        [Field/target]
            AttachmentCard
        [Field/inverse]
            AttachmentCard/attachment
        [Field/isCausal]
            true
`;

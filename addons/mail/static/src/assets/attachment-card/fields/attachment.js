/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        Determines the attachment of this card.
    {Field}
        [Field/name]
            attachment
        [Field/model]
            AttachmentCard
        [Field/type]
            m2o
        [Field/target]
            Attachment
        [Field/isRequired]
            true
        [Field/inverse]
            Attachment/attachmentCards
`;

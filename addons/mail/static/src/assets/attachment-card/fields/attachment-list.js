/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        States the attachmentList displaying this card.
    {Field}
        [Field/name]
            attachmentList
        [Field/model]
            AttachmentCard
        [Field/type]
            m2o
        [Field/target]
            AttachmentList
        [Field/isRequired]
            true
        [Field/isReadonly]
            true
        [Field/inverse]
            AttachmentList/attachmentCards
`;

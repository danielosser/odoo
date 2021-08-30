/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            attachmentCard
        [Field/model]
            AttachmentCardComponent
        [Field/type]
            m2o
        [Field/target]
            AttachmentCard
        [Field/inverse]
            AttachmentCard/component
`;

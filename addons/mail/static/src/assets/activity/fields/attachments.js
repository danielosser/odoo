/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            attachments
        [Field/model]
            Activity
        [Field/type]
            m2m
        [Field/target]
            Attachment
        [Field/inverse]
            Attachment/activities
`;

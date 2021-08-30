/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            activities
        [Field/model]
            Attachment
        [Field/type]
            m2m
        [Field/target]
            Activity
        [Field/inverse]
            Activity/attachments
`;

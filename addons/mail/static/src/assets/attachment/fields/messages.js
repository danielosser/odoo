/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            messages
        [Field/model]
            Attachment
        [Field/type]
            m2m
        [Field/target]
            Message
        [Field/inverse]
            Message/attachments
`;

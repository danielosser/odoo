/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            threads
        [Field/model]
            Attachment
        [Field/type]
            m2m
        [Field/target]
            Thread
        [Field/inverse]
            Thread/attachments
`;

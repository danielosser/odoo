/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            subject
        [Field/model]
            Message
        [Field/type]
            attr
        [Field/target]
            String
        [Field/isOptional]
            true
`;

/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            isNote
        [Field/model]
            Message
        [Field/type]
            attr
        [Field/target]
            Boolean
        [Field/default]
            false
`;

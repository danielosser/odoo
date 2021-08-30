/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            model
        [Field/model]
            Thread
        [Field/type]
            attr
        [Field/target]
            String
        [Field/isId]
            true
        [Field/isRequired]
            true
        [Field/isReadonly]
            true
`;

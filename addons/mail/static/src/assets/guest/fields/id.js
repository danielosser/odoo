/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            id
        [Field/model]
            Guest
        [Field/type]
            attr
        [Field/target]
            Integer
        [Field/isRequired]
            true
        [Field/isReadonly]
            true
`;

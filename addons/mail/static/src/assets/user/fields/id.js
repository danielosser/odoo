/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            id
        [Field/model]
            User
        [Field/type]
            attr
        [Field/isReadonly]
            true
        [Field/isId]
            true
`;

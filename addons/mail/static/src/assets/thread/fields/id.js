/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            id
        [Field/model]
            Thread
        [Field/type]
            attr
        [Field/isReadonly]
            true
        [Field/isRequired]
            true
        [Field/isId]
            true
`;

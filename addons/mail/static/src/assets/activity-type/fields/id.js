/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            id
        [Field/model]
            ActivityType
        [Field/type]
            attr
        [Field/isRequired]
            true
        [Field/isReadonly]
            true
`;

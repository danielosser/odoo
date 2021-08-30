/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            id
        [Field/model]
            Follower
        [Field/type]
            attr
        [Field/target]
            Number
        [Field/isRequired]
            true
        [Field/isReadonly]
            true
`;

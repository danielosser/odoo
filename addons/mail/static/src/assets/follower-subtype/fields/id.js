/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            id
        [Field/model]
            FollowerSubtype
        [Field/type]
            attr
        [Field/target]
            Number
        [Field/isRequied]
            true
        [Field/isReadonly]
            true
`;

/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            isDefault
        [Field/model]
            FollowerSubtype
        [Field/type]
            attr
        [Field/target]
            Boolean
        [Field/default]
            false
`;

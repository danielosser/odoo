/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            chainingType
        [Field/model]
            Activity
        [Field/type]
            attr
        [Field/target]
            String
        [Field/default]
            suggest
`;

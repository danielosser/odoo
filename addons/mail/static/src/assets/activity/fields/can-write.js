/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            canWrite
        [Field/model]
            Activity
        [Field/type]
            attr
        [Field/target]
            Boolean
        [Field/default]
            false
`;

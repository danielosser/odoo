/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            thread
        [Field/model]
            ThreadCache
        [Field/type]
            o2o
        [Field/target]
            Thread
        [Field/inverse]
            Thread/cache
        [Field/isReadonly]
            true
        [Field/isRequired]
            true
        [Field/isId]
            true
`;

/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            discussAsChat
        [Field/model]
            DiscussSidebarCategory
        [Field/type]
            o2o
        [Field/target]
            Discuss
        [Field/isReadonly]
            true
        [Field/inverse]
            Discuss/categoryChat
`;
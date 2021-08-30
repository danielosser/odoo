/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            discussAsLivechat
        [Field/feature]
            im_livechat
        [Field/model]
            DiscussSidebarCategory
        [Field/type]
            o2o
        [Field/target]
            Discuss
        [Field/inverse]
            Discuss/categoryLivechat
        [Field/isReadonly]
            true
`;

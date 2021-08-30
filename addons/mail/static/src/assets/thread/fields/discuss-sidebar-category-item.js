/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            discussSidebarCategoryItem
        [Field/model]
            Thread
        [Field/type]
            o2m
        [Field/target]
            DiscussSidebarCategoryItem
        [Field/isCausal]
            true
        [Field/inverse]
            DiscussSidebarCategoryItem/channel
`;

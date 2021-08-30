/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            categoryChat
        [Element/model]
            DiscussSidebarComponent
        [Model/traits]
            DiscussSidebarComponent/category
        [Field/target]
            DiscussSidebarCategoryComponent
        [Element/props]
            [DiscussSidebarCategoryComponent/category]
                @record
                .{DiscussSidebarComponent/discuss}
                .{Discuss/categoryChat}
`;

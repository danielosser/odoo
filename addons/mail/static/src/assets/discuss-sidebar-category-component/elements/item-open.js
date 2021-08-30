/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            itemOpen
        [Element/model]
            DiscussSidebarCategoryComponent
        [Model/traits]
            DiscussSidebarCategoryComponent/item
        [Element/t-foreach]
            @record
            .{DiscussSidebarCategoryComponent/category}
            .{DiscussSidebarCategory/categoryItems}
        [Element/t-as]
            item
        [Element/t-key]
            @template
            .{Template/item}
            .{Record/id}
        [Field/target]
            DiscussSidebarCategoryItemComponent
        [Element/props]
            [DiscussSidebarCategoryItemComponent/categoryItem]
                @template
                .{Template/item}
`;

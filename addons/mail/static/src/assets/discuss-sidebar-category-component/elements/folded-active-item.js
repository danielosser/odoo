/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            foldedActiveItem
        [Element/model]
            DiscussSidebarCategoryComponent
        [Model/traits]
            DiscussSidebarCategoryComponent/item
        [Element/isPresent]
            @record
            .{DiscussSidebarCategoryComponent/category}
            .{DiscussSidebarCategory/isOpen}
            .{isFalsy}
            .{&}
                @record
                .{DiscussSidebarCategoryComponent/category}
                .{DiscussSidebarCategory/activeItem}
        [Field/target]
            DiscussSidebarCategoryItemComponent
        [Element/props]
            [DiscussSidebarCategoryItemComponent/categoryItem]
                @record
                .{DiscussSidebarCategoryComponent/category}
                .{DiscussSidebarCategory/activeItem}
`;

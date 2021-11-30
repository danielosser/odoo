/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            counter
        [Element/model]
            DiscussSidebarCategoryComponent
        [Model/traits]
            DiscussSidebarCategoryComponent/headerItem
        [Element/isPresent]
            @record
            .{DiscussSidebarCategoryComponent/category}
            .{DiscussSidebarCategory/isOpen}
            .{isFalsy}
            .{&}
                @record
                .{DiscussSidebarCategoryComponent/category}
                .{DiscussSidebarCategory/counter}
                .{>}
                    0
        [web.Element/class]
            badge
            badge-pill
        [web.Element/textContent]
            @record
            .{DiscussSidebarCategoryComponent/category}
            .{DiscussSidebarCategory/counter}
        [web.Element/style]
            [web.scss/background-color]
                {scss/$o-brand-primary}
            [web.scss/color]
                {scss/gray}
                    300
`;

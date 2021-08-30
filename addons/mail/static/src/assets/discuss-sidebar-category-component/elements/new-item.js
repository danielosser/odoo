/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            newItem
        [Element/model]
            DiscussSidebarCategoryComponent
        [Element/isPresent]
            @record
            .{DiscussSidebarCategoryComponent/category}
            .{DiscussSidebarCategory/isOpen}
            .{&}
                @record
                .{DiscussSidebarCategoryComponent/category}
                .{DiscussSidebarCategory/isAddingItem}
        [web.Element/style]
            [web.scss/display]
                flex
            [web.scss/justify-content]
                center
            [web.scss/padding-bottom]
                {scss/map-get}
                    {scss/$spacers}
                    2
`;

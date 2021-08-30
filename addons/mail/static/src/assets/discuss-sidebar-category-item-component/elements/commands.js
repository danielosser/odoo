/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            commands
        [Element/model]
            DiscussSidebarCategoryItemComponent
        [Model/traits]
            DiscussSidebarCategoryItemComponent/item
        [Element/isPresent]
            @record
            .{DiscussSidebarCategoryItemComponent/root}
            .{web.Element/isHover}
        [web.Element/style]
            [web.scss/display]
                flex
`;

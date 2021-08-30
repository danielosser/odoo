/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            commandSettings
        [Element/model]
            DiscussSidebarCategoryItemComponent
        [Model/traits]
            DiscussSidebarCategoryItemComponent/command
        [Element/isPresent]
            @record
            .{DiscussSidebarCategoryItemComponent/categoryItem}
            .{DiscussSidebarCategoryItem/hasSettingsCommand}
        [web.Element/class]
            fa
            fa-cog
        [Element/onClick]
            {DiscussSidebarCategoryItem/onClickCommandSettings}
                @record
                .{DiscussSidebarCategoryItemComponent/categoryItem}
        [web.Element/title]
            {Locale/text}
                Channel settings
        [web.Element/role]
            img
`;

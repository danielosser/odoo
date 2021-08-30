/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            categoryLivechat
        [Element/feature]
            im_livechat
        [Element/model]
            DiscussSidebarComponent
        [Element/isPresent]
            {Discuss/categoryLivechat}
            .{DiscussSidebarCategory/selectedChannels}
            .{Collection/length}
            .{>}
                0
        [Model/traits]
            DiscussSidebarComponent/category
        [Field/target]
            DiscussSidebarCategoryComponent
        [Element/props]
            [DiscussSidebarCategoryComponent/category]
                {Discuss/categoryLivechat}
`;

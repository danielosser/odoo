/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            autogrow
        [Element/model]
            DiscussSidebarCategoryItemComponent
        [Model/traits]
            AutogrowComponent
            DiscussSidebarCategoryItemComponent/item
`;

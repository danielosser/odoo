/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            autogrow
        [Element/model]
            DiscussSidebarCategoryComponent
        [Model/traits]
            AutogrowComponent
            DiscussSidebarCategoryComponent/headerItem
`;

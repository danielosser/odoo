/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            commands
        [Element/model]
            DiscussSidebarCategoryComponent
        [Model/traits]
            DiscussSidebarCategoryComponent/headerItem
        [web.Element/style]
            [web.scss/display]
                flex
`;

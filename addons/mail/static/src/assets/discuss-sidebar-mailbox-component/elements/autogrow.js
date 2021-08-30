/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            autogrow
        [Element/model]
            DiscussSidebarMailboxComponent
        [Model/traits]
            AutogrowComponent
        [Model/traits]
            DiscussSidebarMailboxComponent/item
`;

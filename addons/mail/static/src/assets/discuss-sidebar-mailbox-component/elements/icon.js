/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            icon
        [Element/model]
            DiscussSidebarMailboxComponent
        [Model/traits]
            DiscussSidebarMailboxComponent/item
        [Field/target]
            ThreadIconComponent
        [Element/props]
            [ThreadIconComponent/thread]
                @record
                .{DiscussSidebarMailboxComponent/mailbox}
`;

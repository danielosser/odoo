/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            name
        [Element/model]
            DiscussSidebarMailboxComponent
        [Model/traits]
            DiscussSidebarMailboxComponent/item
        [web.Element/textContent]
            @record
            .{DiscussSidebarMailboxComponent/mailbox}
            .{Thread/displayName}
        [web.Element/style]
            {web.scss/include}
                {web.scss/text-truncate}
`;

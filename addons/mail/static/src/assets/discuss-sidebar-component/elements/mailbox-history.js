/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            mailboxHistory
        [Element/model]
            DiscussSidebarComponent
        [Field/target]
            DiscussSidebarMailboxComponent
        [Element/props]
            [DiscussSidebarMailboxComponent/thread]
                {Env/history}
`;

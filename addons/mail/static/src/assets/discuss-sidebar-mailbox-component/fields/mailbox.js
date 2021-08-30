/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            mailbox
        [Field/model]
            DiscussSidebarMailboxComponent
        [Field/type]
            m2o
        [Field/target]
            Thread
`;

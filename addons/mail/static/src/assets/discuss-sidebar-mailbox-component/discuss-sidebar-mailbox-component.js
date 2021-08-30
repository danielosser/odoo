/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Model}
        [Model/name]
            DiscussSidebarMailboxComponent
        [Model/fields]
            mailbox
        [Model/template]
            root
                icon
                name
                autogrow
                counter
`;

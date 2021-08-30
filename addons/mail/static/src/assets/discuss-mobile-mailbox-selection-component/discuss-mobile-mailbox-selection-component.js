/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Model}
        [Model/name]
            DiscussMobileMailboxSelectionComponent
        [Model/fields]
            discuss
        [Model/template]
            root
                button
        [Model/actions]
            DiscussMobileMailboxSelectionComponent/getOrderedMailboxes
`;

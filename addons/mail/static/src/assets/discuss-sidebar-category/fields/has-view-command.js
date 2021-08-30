/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        Boolean that determines whether this category has a 'view' command.
    {Field}
        [Field/name]
            hasViewCommand
        [Field/model]
            DiscussSidebarCategory
        [Field/type]
            attr
        [Field/target]
            Boolean
        [Field/default]
            false
`;

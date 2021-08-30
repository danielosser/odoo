/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        Determines how the autocomplete of this category should behave.
        Must be one of: 'channel', 'chat'.
    {Field}
        [Field/name]
            autocompleteMethod
        [Field/model]
            DiscussSidebarCategory
        [Field/type]
            attr
`;

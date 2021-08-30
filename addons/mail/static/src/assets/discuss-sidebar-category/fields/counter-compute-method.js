/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        Determines how the counter of this category should be computed.
        Supported methods: 'needaction', 'unread'.
    {Field}
        [Field/name]
            counterComputeMethod
        [Field/model]
            DiscussSidebarCategory
        [Field/type]
            attr
        [Field/isRequired]
            true
`;

/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        The related channel thread.
    {Field}
        [Field/name]
            channel
        [Field/model]
            DiscussSidebarCategoryItem
        [Field/type]
            o2o
        [Field/target]
            Thread
        [Field/isReadonly]
            true
        [Field/isRequired]
            true
        [Field/inverse]
            Tread/discussSidebarCategoryItem
`;

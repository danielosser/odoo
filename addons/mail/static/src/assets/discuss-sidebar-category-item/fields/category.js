/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        States the discuss sidebar category displaying this.
    {Field}
        [Field/name]
            category
        [Field/model]
            DiscussSidebarCategoryItem
        [Field/type]
            m2o
        [Field/target]
            DiscussSidebarCategory
        [Field/isReadonly]
            true
        [Field/isRequired]
            true
        [Field/inverse]
            DiscussSidebarCategory/categoryItems
`;

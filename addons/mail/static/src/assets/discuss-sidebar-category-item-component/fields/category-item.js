/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            categoryItem
        [Field/model]
            DiscussSidebarCategoryItemComponent
        [Field/type]
            m2o
        [Field/target]
            DiscussSidebarCategoryItem
        [Field/isRequired]
            true
`;

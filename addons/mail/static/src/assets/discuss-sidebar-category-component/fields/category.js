/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            category
        [Field/model]
            DiscussSidebarCategoryComponent
        [Field/type]
            m2o
        [Field/target]
            DiscussSidebarCategory
        [Field/isRequired]
            true
`;

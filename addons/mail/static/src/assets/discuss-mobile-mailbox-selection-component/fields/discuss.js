/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            discuss
        [Field/model]
            DiscussMobileMailboxSelectionComponent
        [Field/type]
            m2o
        [Field/target]
            Discuss
        [Field/isRequired]
            true
`;

/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            assignee
        [Field/model]
            Activity
        [Field/type]
            m2o
        [Field/target]
            User
`;

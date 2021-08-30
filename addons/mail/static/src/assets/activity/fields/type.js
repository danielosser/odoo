/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            type
        [Field/model]
            Activity
        [Field/type]
            m2o
        [Field/target]
            ActivityType
        [Field/inverse]
            ActivityType/activities
`;

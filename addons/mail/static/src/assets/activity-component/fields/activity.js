/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            activity
        [Field/model]
            ActivityComponent
        [Field/type]
            m2o
        [Field/target]
            Activity
        [Field/isRequired]
            true
`;

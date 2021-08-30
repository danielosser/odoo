/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            activityBoxView
        [Field/model]
            ActivityBoxComponent
        [Field/type]
            m2o
        [Field/target]
            ActivityBoxView
        [Field/isRequired]
            true
`;

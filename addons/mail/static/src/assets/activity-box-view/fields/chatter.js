/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            chatter
        [Field/model]
            ActivityBoxView
        [Field/type]
            o2o
        [Field/target]
            Chatter
        [Fild/isReadonly]
            true
        [Field/isRequired]
            true
        [Field/inverse]
            Chatter/activityBoxView
`;

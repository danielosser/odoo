/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            activity
        [Element/model]
            ActivityBoxComponent:activity
        [Field/target]
            ActivityComponent
        [ActivityComponent/activity]
            @record
            .{ActivityBoxComponent:activity/activity}
`;

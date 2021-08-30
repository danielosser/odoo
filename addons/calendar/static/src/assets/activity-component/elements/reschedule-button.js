/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            rescheduleButton
        [Element/model]
            ActivityComponent
        [web.Element/tag]
            button
        [Model/traits]
            ActivityComponent/toolButton
        [web.Element/class]
            btn
            btn-link
        [web.Element/onClick]
            {Activity/reschedule}
                @record
                .{ActivityComponent/activity}
`;

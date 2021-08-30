/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            titleBadgeOverdue
        [Element/model]
            ActivityBoxComponent
        [Model/traits]
            ActivityBoxComponent/titleBadge
        [web.Element/class]
            badge-danger
        [Element/isPresent]
            @record
            .{ActivityBoxComponent/activityBoxView}
            .{ActivityBoxView/chatter}
            .{Chatter/thread}
            .{Thread/overdueActivities}
            .{Collection/length}
            .{>}
                0
        [web.Element/textContent]
            @record
            .{ActivityBoxComponent/activityBoxView}
            .{ActivityBoxView/chatter}
            .{Chatter/thread}
            .{Thread/overdueActivities}
            .{Collection/length}
`;

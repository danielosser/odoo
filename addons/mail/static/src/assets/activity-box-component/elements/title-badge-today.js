/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            titleBadgeToday
        [Element/model]
            ActivityBoxComponent
        [Model/traits]
            ActivityBoxComponent/titleBadge
        [web.Element/class]
            badge-warning
        [Element/isPresent]
            @record
            .{ActivityBoxComponent/activityBoxView}
            .{ActivityBoxView/chatter}
            .{Chatter/thread}
            .{Thread/todayActivities}
            .{Collection/length}
            .{>}
                0
        [web.Element/textContent]
            @record
            .{ActivityBoxComponent/activityBoxView}
            .{ActivityBoxView/chatter}
            .{Chatter/thread}
            .{Thread/todayActivities}
            .{Collection/length}
`;

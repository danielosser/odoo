/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            titleBadgeFuture
        [Element/model]
            ActivityBoxComponent
        [Model/traits]
            ActivityBoxComponent/titleBadge
        [web.Element/class]
            badge-success
        [Element/isPresent]
            @record
            .{ActivityBoxComponent/activityBoxView}
            .{ActivityBoxView/chatter}
            .{Chatter/thread}
            .{Thread/futureActivities}
            .{Collection/length}
            .{>}
                0
        [web.Element/textContent]
            @record
            .{ActivityBoxComponent/activityBoxView}
            .{ActivityBoxView/chatter}
            .{Chatter/thread}
            .{Thread/futureActivities}
            .{Collection/length}
`;

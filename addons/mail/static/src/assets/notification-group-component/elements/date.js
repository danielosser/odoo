/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            date
        [Element/model]
            NotificationGroupComponent
        [web.Element/tag]
            span
        [Model/traits]
            NotificationListItemComponent/date
        [Element/isPresent]
            @record
            .{NotificationGroupComponent/notificationGroup}
            .{NotificationGroup/date}
        [web.Element/textContent]
            @record
            .{NotificationGroupComponent/notificationGroup}
            .{NotificationGroup/date}
            .{Moment/fromNow}
`;

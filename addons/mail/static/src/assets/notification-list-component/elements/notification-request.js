/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            notificationRequest
        [Element/model]
            NotificationListComponent
        [Field/target]
            NotificationRequestComponent
        [Element/isPresent]
            @record
            .{NotificationListComponent/notifications}
            .{Collection/length}
            .{!=}
                0
            .{&}
                @template
                .{Template/notification}
                .{Notification/type}
                .{=}
                    odoobotRequest
        [Element/t-foreach]
            @record
            .{NotificationListComponent/notifications}
        [Element/t-as]
            notification
        [Element/t-key]
            @template
            .{Template/notification}
            .{Notification/uniqueId}
`;

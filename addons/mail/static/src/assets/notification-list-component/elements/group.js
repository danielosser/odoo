/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            group
        [Element/model]
            NotificationListComponent
        [Field/target]
            NotificationGroupComponent
        [Element/isPresent]
            @record
            .{NotificationListComponent/notifications}
            .{Collection/length}
            .{!=}
                0
            .{&}
                @template
                .{Template/notification}
                .{Notification/notificationGroup}
        [Element/props]
            [NotificationGroupComponent/notificationGroup]
                @template
                .{Template/notification}
                .{Notification/notificationGroup}
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

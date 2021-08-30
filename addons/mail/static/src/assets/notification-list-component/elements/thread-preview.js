/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            threadPreview
        [Element/model]
            NotificationListComponent
        [Field/target]
            ThreadPreviewComponent
        [Model/traits]
            NotificationListComponent/preview
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
                    thread
            .{&}
                @template
                .{Template/notification}
                .{Notification/thread}
        [Element/props]
            [ThreadPreviewComponent/thread]
                @template
                .{Template/notification}
                .{Notification/thread}
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

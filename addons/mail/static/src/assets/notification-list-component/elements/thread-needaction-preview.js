/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            threadNeedactionPreview
        [Element/model]
            NotificationListComponent
        [Field/target]
            ThreadNeedactionPreviewComponent
        [Model/traits]
            NotificationListComponent/preview
        [Element/isPresent]
            @template
            .{Template/notifications}
            .{Collection/length}
            .{!=}
                0
            .{&}
                @template
                .{Template/notification}
                .{Notification/type}
                .{=}
                    thread_needaction
            .{&}
                @template
                .{Template/notification}
                .{Notification/thread}
        [Element/props]
            [ThreadNeedactionPreviewComponent/thread]
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

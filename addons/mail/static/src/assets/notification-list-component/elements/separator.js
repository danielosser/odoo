/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            separator
        [Element/model]
            NotificationListComponent
        [Element/isPresent]
            @record
            .{NotificationListComponent/notifications}
            .{Collection/length}
            .{!=}
                0
            .{&}
                @template
                .{Template/notification_last}
                .{isFalsy}
        [Element/t-foreach]
            @record
            .{NotificationListComponent/notifications}
        [Element/t-as]
            notification
        [Element/t-key]
            @template
            .{Template/notification}
            .{Notification/uniqueId}
        [web.Element/style]
            [web.scss/flex]
                0
                0
                auto
            [web.scss/width]
                {scss/map-get}
                    {scss/$sizes}
                    100
            [web.scss/border-bottom]
                {scss/$border-width}
                solid
                {scss/$border-color}
`;

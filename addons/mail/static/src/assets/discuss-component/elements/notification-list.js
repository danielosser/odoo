/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            notificationList
        [Element/model]
            DiscussComponent
        [Field/target]
            NotificationListComponent
        [Element/isPresent]
            {Messaging/isInitialized}
            .{&}
                {Device/isMobile}
            .{&}
                {Discuss/activeMobileNavbarTabId}
                .{!=}
                    mailbox
        [Element/props]
            [NotificationListComponent/filter]
                @record
                .{DiscussComponent/discuss}
                .{Discuss/activeMobileNavbarTabId}
        [web.Element/style]
            [web.scss/width]
                {scss/map-get}
                    {scss/$sizes}
                    100
            [web.scss/flex]
                1
                1
                0
`;

/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            notificationList
        [Element/model]
            MessagingMenuComponent
        [Field/target]
            NotificationListComponent
        [Element/isPresent]
            {Messaging/isInitialized}
        [Element/props]
            [NotificationListComponent/filter]
                {MessagingMenu/activeTabId}
        [web.Element/style]
            {if}
                {Device/isMobile}
            .{then}
                [web.scss/flex]
                    1
                    1
                    auto
                [web.scss/overflow-y]
                    auto
`;

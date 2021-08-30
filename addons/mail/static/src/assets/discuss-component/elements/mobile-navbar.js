/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            mobileNavbar
        [Element/model]
            DiscussComponent
        [Field/target]
            MobileMessagingNavbarComponent
        [Element/isPresent]
            {Messaging/isInitialized}
            .{&}
                {Device/isMobile}
            .{&}
                {Discuss/threadView}
                .{isFalsy}
                .{|}
                    {Discuss/threadView}
                    .{ThreadView/replyingToMessageView}
                    .{isFalsy}
        [Element/props]
            [MobileMessagingNavbarComponent/activeTabId]
                {Discuss/activeMobileNavbarTabId}
            [MobileMessagingNavbarComponent/tabs]
                 {DiscussComponent/getMobileNavbarTabs}
                    @record
        [web.Element/style]
            [web.scss/width]
                {scss/map-get}
                    {scss/$sizes}
                    100
`;

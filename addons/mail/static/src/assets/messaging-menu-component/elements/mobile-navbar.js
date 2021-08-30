/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            mobileNavbar
        [Element/model]
            MessagingMenuComponent
        [Field/target]
            MobileMessagingNavbarComponent
        [Element/isPresent]
            {Messaging/isInitialized}
            .{&}
                {Device/isMobile}
        [Element/props]
            [MobileMessagingNavbarComponent/activeTabId]
                {MessagingMenu/activeTabId}
            [MobileMessagingNavbarComponent/tabs]
                {MessagingMenuComponent/getTabs}
                    @record
`;

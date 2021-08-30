/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            markAsRead
        [Element/model]
            NotificationGroupComponent
        [web.Element/tag]
            span
        [Model/traits]
            NotificationGroupComponent/coreItem
            NotificationListItemComponent/markAsRead
        [web.Element/class]
            fa
            fa-check
        [web.Element/title]
            {Locale/text}
                Discard message delivery failures
        [Element/onClick]
            {NotificationGroup/openCancelAction}
                @record
                .{NotificationGroupComponent/notificationGroup}
            {if}
                {Device/isMobile}
                .{isFalsy}
            .{then}
                {MessagingMenu/close}
`;

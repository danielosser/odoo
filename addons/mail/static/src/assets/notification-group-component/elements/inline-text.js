/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            inlineText
        [Element/model]
            NotificationGroupComponent
        [web.Element/tag]
            span
        [Model/traits]
            NotificationGroupComponent/coreItem
            NotificationListItemComponent/inlineText
        [web.Element/class]
            text-truncate
        [web.Element/textContent]
            {if}
                @record
                .{NotificationGroupComponent/notificationGroup}
                .{NotificationGroup/type}
                .{=}
                    email
            .{then}
                {Locale/text}
                    An error occurred when sending an email.
`;

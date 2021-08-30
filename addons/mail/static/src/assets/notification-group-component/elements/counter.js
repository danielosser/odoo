/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            counter
        [Element/model]
            NotificationGroupComponent
        [web.Element/tag]
            span
        [Model/traits]
            NotificationListItemComponent/bold
            NotificationListItemComponent/counter
        [web.Element/textContent]
            {String/sprintf}
                [0]
                    {Locale/text}
                        (%s)
                [1]
                    @record
                    .{NotificationGroupComponent/notificationGroup}
                    .{NotificationGroup/notifications}
                    .{Collection/length}
`;

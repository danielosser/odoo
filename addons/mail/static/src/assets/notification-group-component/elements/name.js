/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            name
        [Element/model]
            NotificationGroupComponent
        [web.Element/tag]
            span
        [Model/traits]
            NotificationListItemComponent/bold
            NotificationListItemComponent/name
        [web.Element/class]
            text-truncate
        [web.Element/textContent]
            @record
            .{NotificationGroupComponent/notificationGroup}
            .{NotificationGroup/resModelName}
`;

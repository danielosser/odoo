/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            notification
        [Element/model]
            NotificationPopoverComponent
        [Element/t-foreach]
            @record
            .{NotificationPopoverComponent/notifications}
        [Element/t-as]
            notification
        [Element/t-key]
            @template
            .{Template/notification}
            .{Record/id}
`;

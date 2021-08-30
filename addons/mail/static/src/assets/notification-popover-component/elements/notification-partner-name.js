/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            notificationPartnerName
        [Element/model]
            NotificationPopoverComponent
        [web.Element/tag]
            span
        [Element/isPresent]
            @template
            .{Template/notification}
            .{Notification/partner}
        [web.Element/textContent]
            @template
            .{Template/notification}
            .{Notification/partner}
            .{Partner/nameOrDisplayName}
`;

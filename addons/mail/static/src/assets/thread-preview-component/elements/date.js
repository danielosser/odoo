/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            date
        [Element/model]
            ThreadPreviewComponent
        [web.Element/tag]
            span
        [Model/traits]
            NotificationListItemComponent/date
        [Element/isPresent]
            @record
            .{ThreadPreviewComponent/thread}
            .{Thread/lastMessage}
            .{&}
                @record
                .{ThreadPreviewComponent/thread}
                .{Thread/lastMessage}
                .{Message/date}
        [web.Element/textContent]
            @record
            .{ThreadPreviewComponent/thread}
            .{Thread/lastMessage}
            .{Message/date}
            .{Moment/fromNow}
`;

/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            date
        [Element/model]
            ThreadNeedactionPreviewComponent
        [web.Element/tag]
            span
        [Model/traits]
            NotificationListItemComponent/date
        [Element/isPresent]
            @record
            .{ThreadNeedactionPreviewComponent/thread}
            .{Thread/lastNeedactionMessageAsOriginThread}
            .{&}
                @record
                .{ThreadNeedactionPreviewComponent/thread}
                .{Thread/lastNeedactionMessageAsOriginThread}
                .{Message/date}
        [web.Element/textContent]
            @record
            .{ThreadNeedactionPreviewComponent/thread}
            .{Thread/lastNeedactionMessageAsOriginThread}
            .{Message/date}
            .{Moment/fromNow}
`;

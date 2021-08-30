/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            markAsRead
        [Element/model]
            ThreadNeedactionPreviewComponent
        [web.Element/tag]
            span
        [Model/traits]
            NotificationListItemComponent.markAsRead
            ThreadNeedactionPreviewComponent/coreItem
        [web.Element/class]
            fa
            fa-check
        [web.Element/title]
            {Locale/text}
                Mark as Read
        [Element/onClick]
            {Message/markAllAsRead}
                model
                .{=}
                    @record
                    .{ThreadNeedactionPreviewComponent/thread}
                    .{Thread/model}
                .{&}
                    res_id
                    .{=}
                        @record
                        .{ThreadNeedactionPreviewComponent/thread}
                        .{Thread/id}
`;

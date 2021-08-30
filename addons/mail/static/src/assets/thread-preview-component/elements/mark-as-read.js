/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            markAsRead
        [Element/model]
            ThreadPreviewComponent
        [web.Element/tag]
            span
        [Model/traits]
            ThreadPreviewComponent/coreItem
            NotificationListItemComponent/markAsRead
        [web.Element/class]
            fa
            fa-check
        [Element/isPresent]
            @record
            .{ThreadPreviewComponent/thread}
            .{Thread/localMessageUnreadCounter}
            .{>}
                0
        [web.Element/title]
            {Locale/text}
                Mark as Read
        [Element/onClick]
            {if}
                @record
                .{ThreadPreviewComponent/thread}
                .{Thread/lastMessage}
            .{then}
                {Thread/markAsSeen}
                    [0]
                        @record
                        .{ThreadPreviewComponent/thread}
                    [1]
                        @record
                        .{ThreadPreviewComponent/thread}
                        .{Thread/lastNonTransientMessage}
`;

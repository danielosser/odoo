/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            name
        [Element/model]
            ThreadPreviewComponent
        [web.Element/tag]
            span
        [Model/traits]
            {if}
                @record
                .{ThreadPreviewComponent/thread}
                .{Thread/localMessageUnreadCounter}
                .{>}
                    0
            .{then}
                NotificationListItemComponent/bold
            NotificationListItemComponent/name
        [web.Element/textContent]
            @record
            .{ThreadPreviewComponent/thread}
            .{Thread/displayName}
`;

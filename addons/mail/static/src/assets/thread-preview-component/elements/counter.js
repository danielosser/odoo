/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            counter
        [Element/model]
            ThreadPreviewComponent
        [web.Element/tag]
            span
        [Model/traits]
            NotificationListItemComponent/bold
            NotificationListItemComponent/counter
        [Element/isPresent]
            @record
            .{ThreadPreviewComponent/thread}
            .{Thread/localMessageUnreadCounter}
            .{>}
                0
        [web.Element/textContent]
            {String/sprintf}
                [0]
                    {Locale/text}
                        (%s)
                [1]
                    @record
                    .{ThreadPreviewComponent/thread}
                    .{Thread/localMessageUnreadCounter}
`;

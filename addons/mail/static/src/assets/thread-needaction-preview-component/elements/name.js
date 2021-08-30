/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            name
        [Element/model]
            ThreadNeedactionPreviewComponent
        [web.Element/tag]
            span
        [Model/traits]
            NotificationListItemComponent/bold
            NotificationListItemComponent/name
        [web.Element/textContent]
            @record
            .{ThreadNeedactionPreviewComponent/thread}
            .{Thread/displayName}
`;

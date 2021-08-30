/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            emptyHistoryTitle
        [Element/model]
            MessageListComponent
        [Model/traits]
            MessageListComponent/emptyTitle
        [web.Element/class]
            o-neutral-face-icon
        [Element/isPresent]
            @record
            .{MessageListComponent/threadView}
            .{ThreadView/thread}
            .{=}
                {Env/history}
        [web.Element/textContent]
            {Locale/text}
                No history messages
`;

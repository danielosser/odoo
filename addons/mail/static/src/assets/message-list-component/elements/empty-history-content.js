/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            emptyHistoryContent
        [Element/model]
            MessageListComponent
        [web.Element/tag]
            span
        [Element/isPresent]
            @record
            .{MessageListComponent/threadView}
            .{ThreadView/thread}
            .{=}
                {Env/history}
        [web.Element/textContent]
            {Locale/text}
                Messages marked as read will appear in the history.
`;

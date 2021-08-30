/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            emptyInboxContent
        [Element/model]
            MessageListComponent
        [web.Element/tag]
            span
        [Element/isPresent]
            @record
            .{MessageListComponent/threadView}
            .{ThreadView/thread}
            .{=}
                {Env/inbox}
        [web.Element/textContent]
            {Locale/text}
                New messages appear here.
`;

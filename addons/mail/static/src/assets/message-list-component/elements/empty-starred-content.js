/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            emptyStarredContent
        [Element/model]
            MessageListComponent
        [web.Element/tag]
            span
        [Element/isPresent]
            @record
            .{MessageListComponent/threadView}
            .{ThreadView/thread}
            .{=}
                {Env/starred}
        [web.Element/textContent]
            {Locale/text}
                You can mark any message as 'starred', and it shows up in this mailbox.
`;

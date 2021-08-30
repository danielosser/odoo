/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            emptyInboxTitle
        [Element/model]
            MessageListComponent
        [Model/traits]
            MessageListComponent/emptyTitle
        [Element/isPresent]
            @record
            .{MessageListComponent/threadView}
            .{ThreadView/thread}
            .{=}
                {Env/inbox}
        [web.Element/textContent]
            {Locale/text}
                Congratulations, your inbox is empty
`;

/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            emptyStarredTitle
        [Element/model]
            MessageListComponent
        [Model/traits]
            MessageListComponent/emptyTitle
        [Element/isPresent]
            @record
            .{MessageListComponent/threadView}
            .{ThreadView/thread}
            .{=}
                {Env/starred}
        [web.Element/textContent]
            {Locale/text}
                No starred messages
`;

/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            emptyOtherContent
        [Element/model]
            MessageListComponent
        [web.Element/tag]
            span
        [Element/isPresent]
            @record
            .{MessageListComponent/threadView}
            .{ThreadView/thread}
            .{Thread/model}
            .{!=}
                mail.box
        [web.Element/textContent]
            {Locale/text}
                There are no messages in this conversation.
`;

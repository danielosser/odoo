/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            messageInReplyToView
        [Element/model]
            MessageViewComponent
        [Element/isPresent]
            @record
            .{MessageViewComponent/messageView}
            .{MessageView/messageInReplyToView}
        [Field/target]
            MessageInReplyToViewComponent
        [Element/props]
            [MessageInReplyToViewComponent/messageInReplyToView]
                @record
                .{MessageViewComponent/messageView}
                .{MessageView/messageInReplyToView}
`;

/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            seenIndicatorNonSquashed
        [Element/model]
            MessageViewComponent
        [Field/target]
            MessageSeenIndicatorComponent
        [Model/traits]
            MessageViewComponent/seenIndicator
        [Element/props]
            [MessageSeenIndicatorComponent/message]
                @record
                .{MessageViewComponent/messageView}
                .{MessageView/message}
            [MessageSeenIndicatorComponent/thread]
                @record
                .{MessageViewComponent/threadView}
                .{ThreadView/thread}
        [Element/isPresent]
            @record
            .{MessageViewComponent/messageView}
            .{MessageView/message}
            .{Message/isCurrentUserOrGuestAuthor}
            .{&}
                @record
                .{MessageViewComponent/threadView}
            .{&}
                @record
                .{MessageViewComponent/threadView}
                .{ThreadView/thread}
`;

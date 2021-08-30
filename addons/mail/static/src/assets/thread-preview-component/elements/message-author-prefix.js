/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            messageAuthorPrefix
        [Element/model]
            ThreadPreviewComponent
        [Field/target]
            MessageAuthorPrefixComponent
        [Element/isPresent]
            @record
            .{ThreadPreviewComponent/thread}
            .{Thread/lastMessage}
            .{&}
                @record
                .{ThreadPreviewComponent/thread}
                .{Thread/lastMessage}
                .{Message/author}
        [Element/props]
            [MessageAuthorPrefixComponent/message]
                @record
                .{ThreadPreviewComponent/thread}
                .{Thread/lastMessage}
            [MessageAuthorPrefixComponent/thread]
                @record
                .{ThreadPreviewComponent/thread}
`;

/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            messageAuthorPrefix
        [Element/model]
            ThreadNeedactionPreviewComponent
        [Field/target]
            MessageAuthorPrefixComponent
        [Element/isPresent]
            @record
            .{ThreadNeedactionPreviewComponent/thread}
            .{Thread/lastNeedactionMessageAsOriginThread}
            .{&}
                @record
                .{ThreadNeedactionPreviewComponent/thread}
                .{Thread/lastNeedactionMessageAsOriginThread}
                .{Message/author}
        [Element/props]
            [MessageAuthorPrefixComponent/message]
                @record
                .{ThreadNeedactionPreviewComponent/thread}
                .{Thread/lastNeedactionMessageAsOriginThread}
            [MessageAuthorPrefixComponent/thread]
                @record
                .{ThreadNeedactionPreviewComponent/thread}
`;

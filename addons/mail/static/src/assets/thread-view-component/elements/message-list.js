/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            messageList
        [Element/model]
            ThreadViewComponent
        [Field/target]
            MessageListComponent
        [Element/isPresent]
            @record
            .{ThreadViewComponent/threadView}
            .{&}
                @record
                .{ThreadViewComponent/threadView}
                .{ThreadView/thread}
                .{Thread/isTemporary}
                .{|}
                    @record
                    .{ThreadViewComponent/threadView}
                    .{ThreadView/threadCache}
                    .{ThreadCache/isLoaded}
        [Element/props]
            [MessageListComponent/getScrollableElement]
                @record
                .{ThreadViewComponent/getScrollableElement}
            [MessageListComponent/hasScrollAdjust]
                @record
                .{ThreadViewComponent/hasScrollAdjust}
            [MessageListComponent/selectedMessage]
                @record
                .{ThreadViewComponent/selectedMessage}
            [MessageListComponent]
                @record
                .{ThreadViewComponent/threadView}
        [web.Element/style]
            [web.scss/flex]
                1
                1
                auto
`;

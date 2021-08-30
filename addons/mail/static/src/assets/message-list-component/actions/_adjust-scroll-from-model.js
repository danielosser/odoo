/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Action}
        [Action/name]
            MessageListComponent/_adjustScrollFromModel
        [Action/params]
            record
                [type]
                    MessageListComponent
        [Action/behavior]
            {if}
                {MessageListComponent/_getScrollableElement}
                    @record
                .{isFalsy}
                .{|}
                    @record
                    .{MessageListComponent/hasScrollAdjust}
                    .{isFalsy}
            .{then}
                {break}
            {if}
                @record
                .{MessageListComponent/threadView}
                .{ThreadView/threadCacheInitialScrollHeight}
                .{!=}
                    undefined
                .{&}
                    {MessageListComponent/_getScrollableElement}
                        @record
                    .{web.Element/scrollHeight}
                    .{=}
                        @record
                        .{MessageListComponent/threadView}
                        .{ThreadView/threadCacheInitialScrollHeight}
            .{then}
                {MessageListComponent/setScrollTop}
                    [0]
                        @record
                    [1]
                        @record
                        .{MessageListComponent/threadView}
                        .{ThreadView/threadCacheInitialScrollPosition}
            .{else}
                {MessageListComponent/_scrollToEnd}
                    @record
`;

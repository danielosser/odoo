/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            loadMore
        [Element/model]
            MessageListComponent
        [web.Element/tag]
            a
        [Model/traits]
            MessageListComponent/item
        [Element/isPresent]
            @record
            .{MessageListComponent/threadView}
            .{ThreadView/threadCache}
            .{ThreadCache/isLoadingMore}
            .{isFalsy}
            .{&}
                @record
                .{MessageListComponent/threadView}
                .{ThreadView/threadCache}
                .{ThreadCache/isAllHistoryLoaded}
                .{isFalsy}
            .{&}
                @record
                .{MessageListComponent/threadView}
                .{ThreadView/thread}
                .{Thread/isTemporary}
                .{isFalsy}
        [web.Element/href]
            #
        [Element/onClick]
            {web.Event/preventDefault}
                @ev
            {MessageListComponent/_loadMore}
                @record
        [web.Element/textContent]
            {Locale/text}
                Load more
        [web.Element/style]
            [web.scss/align-self]
                center
            [web.scss/cursor]
                pointer
`;

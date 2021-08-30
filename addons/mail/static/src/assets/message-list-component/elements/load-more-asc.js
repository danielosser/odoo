/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            loadMoreAsc
        [Element/model]
            MessageListComponent
        [web.Element/tag]
            t
        [Element/isPresent]
            @record
            .{MessageListComponent/threadView}
            .{ThreadView/threadCache}
            .{ThreadCache/hasLoadingFailed}
            .{isFalsy}
            .{&}
                @record
                .{MessageListComponent/threadView}
                .{ThreadView/order}
                .{=}
                    asc
            .{&}
                @record
                .{MessageListComponent/threadView}
                .{ThreadView/messageViews}
                .{Collection/length}
                .{>}
                    0
`;

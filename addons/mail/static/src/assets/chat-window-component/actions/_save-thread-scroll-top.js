/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        Save the scroll positions of the chat window in the store.
        This is useful in order to remount chat windows and keep previous
        scroll positions. This is necessary because when toggling on/off
        home menu, the chat windows have to be remade from scratch.
    {Action}
        [Action/name]
            ChatWindowComponent/_saveThreadScrollTop
        [Action/params]
            record
        [Action/behavior]
            {if}
                @record
                .{ChatWindowComponent/thread}
                .{isFalsy}
                .{|}
                    @record
                    .{ChatWindowComponent/chatWindow}
                    .{isFalsy}
                .{|}
                    @record
                    .{ChatWindowComponent/chatWindow}
                    .{ChatWindow/threadViewer}
                    .{isFalsy}
            .{then}
                {break}
            {if}
                @record
                .{ChatWindowComponent/chatWindow}
                .{ChatWindow/threadViewer}
                .{ThreadViewer/threadView}
                .{&}
                    @record
                    .{ChatWindowComponent/chatWindow}
                    .{ChatWindow/threadViewer}
                    .{ThreadViewer/threadView}
                    .{ThreadView/componentHintList}
                    .{Collection/length}
                    .{>}
                        0
            .{then}
                {Dev/comment}
                    the current scroll position is likely incorrect due to
                    the presence of hints to adjust it
                {break}
            {ThreadViewer/saveThreadCacheScrollHeightAsInitial}
                [0]
                    @record
                    .{ChatWindowComponent/chatWindow}
                    .{ChatWindow/threadViewer}
                [1]
                    {ThreadViewComponent/getScrollHeight}
                        @record
                        .{ChatWindowComponent/thread}
            {ThreadViewer/saveThreadCacheScrollPositionsAsInitial}
                [0]
                    @record
                    .{ChatWindowComponent/chatWindow}
                    .{ChatWindow/threadViewer}
                [1]
                    {ThreadViewComponent/getScrollTop}
                        @record
                        .{ChatWindowComponent/thread}
`;

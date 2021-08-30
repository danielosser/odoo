/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            unreadHiddenConversationAmount
        [Field/model]
            ChatWindowManager
        [Field/type]
            attr
        [Field/target]
            Number
        [Field/compute]
            @record
            .{ChatWindowManager/allOrderedHidden}
            .{Collection/filter}
                {func}
                    [in]
                        item
                    [out]
                        @item
                        .{ChatWindow/thread}
                        .{isFalsy}
            .{Collection/reduce}
                {func}
                    [in]
                        acc
                        item
                    [out]
                        {if}
                            @item
                            .{Thread/localMessageUnreadCounter}
                            .{>}
                                0
                        .{then}
                            @acc
                            .{+}
                                1
                        .{else}
                            @acc
                0
`;

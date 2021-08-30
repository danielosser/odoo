/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        Sorts 'selectedChannels' by 'lastInterestDateTime'.
        The most recent one will come first.
    {Action}
        [Action/name]
            DiscussSidebarCategory/_sortByLastInterestDateTime
        [Action/params]
            record
                [type]
                    DiscussSidebarCategory
        [Action/returns]
            Collection<Thread>
        [Action/behavior]
            @record
            .{DiscussSidebarCategory/selectedChannels}
            .{Collection/sort}
                {func}
                    [in]
                        item1
                        item2
                    [out]
                        {if}
                            @item1
                            .{Thread/lastInterestDateTime}
                            .{&}
                                @item2
                                .{Thread/lastInterestDateTime}
                                .{isFalsy}
                        .{then}
                            -1
                        .{elif}
                            @item1
                            .{Thread/lastInterestDateTime}
                            .{isFalsy}
                            .{&}
                                @item2
                                .{Thread/lastInterestDateTime}
                        .{then}
                            1
                        .{elif}
                            @item1
                            .{Thread/lastInterestDateTime}
                            .{&}
                                @item2
                                .{Thread/lastInterestDateTime}
                            .{&}
                                @item1
                                .{Thread/lastInterestDateTime}
                                .{!=}
                                    @item2
                                    .{Thread/lastInterestDateTime}
                        .{then}
                            @item2
                            .{Thread/lastInterestDateTime}
                            .{-}
                                @item1
                                .{Thread/lastInterestDateTime}
                        .{else}
                            @item2
                            .{Thread.id}
                            .{-}
                                @item1
                                .{Thread/id}
`;
/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        Sorts 'selectedChannels' by 'displayName' in
        case-insensitive alphabetical order.
    {Action}
        [Action/name]
            DiscussSidebarCategory/_sortByDisplayName
        [Action/params]
            record
                [type]
                    DiscussSidebarCategory
        [Action/returns]
            Collection<Thread>
        [Action/behavior]
            @record
            .{DiscussSidebarCategoryselectedChannels}
            .{Collection/sort}
                {func}
                    [in]
                        @item1
                        @item2
                    [out]
                        {if}
                            @item1
                            .{Thread/displayName}
                            .{&}
                                @item2
                                .{Thread/displayName}
                                .{isFalsy}
                        .{then}
                            -1
                        .{elif}
                            @item1
                            .{Thread/displayName}
                            .{isFalsy}
                            .{&}
                                @item2
                                .{Thread/displayName}
                        .{then}
                            1
                        .{elif}
                            @item1
                            .{Thread/displayName}
                            .{&}
                                @item2
                                .{Thread/displayName}
                            .{&}
                                @item1
                                .{Thread/displayName}
                                .{!=}
                                    @item2
                                    .{Thread/displayName}
                        .{then}
                            {if}
                                @item1
                                .{Thread/displayName}
                                .{String/toLowerCase}
                                .{<}
                                    @item2
                                    .{Thread/displayName}
                                    .{String/toLowerCase}
                            .{then}
                                -1
                            .{else}
                                1
                        .{else}
                            @item1
                            .{Thread/id}
                            .{-}
                                @item2
                                .{Thread/id}
`;
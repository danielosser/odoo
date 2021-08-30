/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        The sorted category items which belong to the category.
        These items are also filtered by 'sidebarQuickSearchValue'.
    {Field}
        [Field/name]
            categoryItems
        [Field/model]
            DiscussSidebarCategory
        [Field/type]
            o2m
        [Field/target]
            DiscussSidebarCategoryItem
        [Field/isCausal]
            true
        [Field/inverse]
            DiscussSidebarCategoryItem/category
        [Field/compute]
            :channels
                @record
                .{DiscussSidebarCategory/selectedSortedChannels}
            :searchValue
                {Discuss/sidebarQuickSearchValue}
            {if}
                @searchValue
            .{then}
                :qsVal
                    @searchValue
                    .{String/toLowerCase}
                :channels
                    @channels
                    .{Collection/filter}
                        {func}
                            [in]
                                item
                            [out]
                                :nameVal
                                    @item
                                    .{Thread/displayName}
                                    .{String/toLowerCase}
                                @nameVal
                                .{String/includes}
                                    @qsVal
            .{else}
                @channels
                .{Collection/map}
                    {func}
                        [in]
                            item
                        [out]
                            {Record/insert}
                                [Record/traits]
                                    DiscussSidebarCategoryItem
                                [DiscussSidebarCategoryItem/channel]
                                    @item
`;

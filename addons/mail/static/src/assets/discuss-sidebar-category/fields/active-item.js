/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        The category item which is active and belongs
        to the category.
    {Field}
        [Field/name]
            activeItem
        [Field/model]
            DiscussSidebarCategory
        [Field/type]
            o2o
        [Field/target]
            DiscussSidebarCategoryItem
        [Field/compute]
            :thread
                {Discuss/thread}
            {if}
                @thread
                .{&}
                    @record
                    .{DiscussSidebarCategory/supportedChannelTypes}
                    .{Collection/includes}
                        @thread
                        .{Thread/channelType}
            .{then}
                {Record/insert}
                    [Record/traits]
                        DiscussSidebarCategoryItem
                    [DiscussSidebarCategoryItem/category]
                        @record
                    [DiscussSidebarCategoryItem/channel]
                        @thread
            .{else}
                {Record/empty}
`;

/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        Channels which belongs to the category,
        and sorted based on the 'supported_channel_type'.
    {Field}
        [Field/name]
            selectedSortedChannels
        [Field/model]
            DiscussSidebarCategory
        [Field/type]
            o2m
        [Field/target]
            Thread
        [Field/compute]
            {switch}
                @record
                .{DiscussSidebarCategory/sortComputeMethod}
            .{case}
                [name]
                    {DiscussSidebarCategory/_sortByDisplayName}
                        @record
                [last_action]
                    {Discuss/_sortByLastInterestDateTime}
                        @record
`;

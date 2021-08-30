/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        Channels which belong to the category,
    {Field}
        [Field/name]
            selectedChannels
        [Field/model]
            DiscussSidebarCategory
        [Field/type]
            o2m
        [Field/target]
            Thread
        [Field/compute]
            {Record/all}
                [Record/traits]
                    Thread
                {func}
                    [in]
                        item
                    [out]
                        @item
                        .{Thread/model}
                            .{=}
                                mail.channel
                        .{&}
                            @item
                            .{Thread/isPinned}
                        .{&}
                            @record
                            .{DiscussSidebarCategory/supportedChannelTypes}
                            .{Collection/includes}
                                @item
                                .{Thread/channelType}
`;

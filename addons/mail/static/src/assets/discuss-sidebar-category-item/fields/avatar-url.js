/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        Image URL for the related channel thread.
    {Field}
        [Field/name]
            avatarUrl
        [Field/model]
            DiscussSidebarCategoryItem
        [Field/type]
            attr
        [Field/target]
            String
        [Field/compute]
            {switch}
                @record
                .{DiscussSidebarCategoryItem/channelType}
            .{case}
                [channel]
                    /web/image/mail.channel/
                    .{+}
                        @record
                        .{DiscussSidebarCategoryItem/channel}
                        .{Thread/id}
                    .{+}
                        /image_128
                    .{+}
                        ?unique=
                    .{+}
                        @record
                        .{ThreadNeedactionPreviewComponent/thread}
                        .{Thread/avatarCacheKey}
                [group]
                    /web/image/mail.channel/
                    .{+}
                        @record
                        .{DiscussSidebarCategoryItem/channelId}
                    .{+}
                        /image_128
                    .{+}
                        ?unique=
                    .{+}
                        @record
                        .{ThreadNeedactionPreviewComponent/thread}
                        .{Thread/avatarCacheKey}
                [chat]
                    @record
                    .{DiscussSidebarCategoryItem/channel}
                    .{Thread/correspondent}
                    .{Partner/avatarUrl}
`;

/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {FieldAddon}
        [FieldAddon/field]
            DiscussSidebarCategoryItem/counter
        [FieldAddon/feature]
            im_livechat
        [FieldAddon/compute]
            {if}
                @record
                .{DiscussSidebarCategoryItem/channelType}
                .{=}
                    livechat
            .{then}
                @record
                .{DiscussSidebarCategoryItem/channel}
                .{Thread/localMessageUnreadCounter}
            .{else}
                @original
`;

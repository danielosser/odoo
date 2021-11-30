/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {FieldAddon}
        [FieldAddon/field]
            DiscussSidebarCategoryItem/hasUnpinCommand
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
                .{isFalsy}
            .{else}
                @original
`;

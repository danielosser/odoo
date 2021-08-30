/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {ActionAddon}
        [ActionAddon/action]
            NotificationListComponent/_getThreads
        [ActionAddon/feature]
            im_livechat
        [FieldAddon/behavior]
            {if}
                @record
                .{NotificationListComponent/filter}
                .{=}
                    livechat
            .{then}
                {Record/all}
                    [Record/traits]
                        Thread
                    {func}
                        [in]
                            item
                        [out]
                            @item
                            .{Thread/channelType}
                            .{=}
                                livechat
                            .{&}
                                @item
                                .{Thread/isPinned}
                            .{&}
                                @item
                                .{Thread/model}
                                .{=}
                                    mail/channel
            .{else}
                @original
`;

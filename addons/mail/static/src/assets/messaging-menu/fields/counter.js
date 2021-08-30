/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        States the counter of this messaging menu. The counter is an integer
        value to give to the current user an estimate of how many things
        (unread threads, notifications, ...) are yet to be processed by him.
    {Field}
        [Field/name]
            counter
        [Field/model]
            MessagingMenu
        [Field/type]
            attr
        [Field/target]
            Number
        [Field/compute]
            :unreadChannelsCounter
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
                                @item
                                .{Thread/localMessageUnreadCounter}
                                .{>}
                                    0
                .{Collection/length}
            :notificationGroupsCounter
                {Record/all}
                    [Record/traits]
                        NotificationGroup
                .{Collection/reduce}
                    [0]
                        {func}
                            [in]
                                acc
                                item
                            [out]
                                @acc
                                .{+}
                                    @item
                                    .{NotificationGroup/notifications}
                                    .{Collection/length}
                    [1]
                        0
            :notificationPemissionCounter
                {if}
                    {Env/isNotificationPermissionDefault}
                .{then}
                    1
                .{else}
                    0
            {Env/inbox}
            .{Thread/counter}
            .{+}
                @unreadChannelsCounter
            .{+}
                @notificationGroupsCounter
            .{+}
                @notificationPemissionCounter
`;

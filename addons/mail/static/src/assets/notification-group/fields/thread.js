/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        Related thread when the notification group concerns a single thread.
    {Field}
        [Field/name]
            thread
        [Field/model]
            NotificationGroup
        [Field/type]
            m2o
        [Field/target]
            Thread
        [Field/compute]
            :notificationsThreadIds
                @record
                .{NotificationGroup/notifications}
                .{Collection/filter}
                    {func}
                        [in]
                            item
                        [out]
                            @item
                            .{Notification/message}
                            .{&}
                                @item
                                .{Notification/message}
                                .{Message/originThread}
                .{Collection/map}
                    {func}
                        [in]
                            item
                        [out]
                            @item
                            .{Notification/message}
                            .{Message/originThread}
                            .{Thread/id}
            :threadIds
                {Record/insert}
                    [Record/traits]
                        Set
                    @notificationsThreadIds
            {if}
                @threadIds
                .{Set/size}
                .{!=}
                    1
            .{then}
                {Record/empty}
            .{else}
                {Record/insert}
                    [Record/traits]
                        Thread
                    [Thread/id]
                        @notificationsThreadIds
                        .{Collection/first}
                    [Thread/model]
                        @record
                        .{NotificationGroup/resModel}
`;

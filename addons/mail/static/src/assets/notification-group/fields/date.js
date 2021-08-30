/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        States the most recent date of all the notification message.
    {Field}
        [Field/name]
            date
        [Field/model]
            NotificationGroup
        [Field/type]
            attr
        [Field/target]
            Date
        [Field/compute]
            :dates
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
                                .{Message/date}
                .{Collection/map}
                    {func}
                        [in]
                            item
                        [out]
                            @item
                            .{Notification/message}
                            .{Message/date}
            {if}
                @dates
                .{Collection/length}
                .{=}
                    0
            .{then}
                {Record/empty}
            .{else}
                {Moment/max}
                    @dates
`;

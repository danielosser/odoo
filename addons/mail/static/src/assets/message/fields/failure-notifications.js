/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            failureNotifications
        [Field/model]
            Message
        [Field/type]
            o2m
        [Field/target]
            Notification
        [Field/compute]
            @record
            .{Message/notifications}
            .{Collection/filter}
                {func}
                    [in]
                        item
                    [out]
                        @item
                        .{Notification/isFailure}
`;

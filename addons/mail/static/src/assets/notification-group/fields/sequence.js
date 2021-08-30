/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        States the position of the group inside the notification list.
    {Field}
        [Field/name]
            sequence
        [Field/model]
            NotificationGroup
        [Field/type]
            attr
        [Field/target]
            Number
        [Field/default]
            0
        [Field/compute]
            0
            .{-}
                {Math/max}
                    @record
                    .{NotificationGroup/notifications}
                    .{Collection/map}
                        {func}
                            [in]
                                item
                            [out]
                                @item
                                .{Notification/message}
                                .{Message/id}
`;

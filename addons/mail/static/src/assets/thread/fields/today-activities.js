/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        States the 'Activity' that belongs to 'this' and that are due
        specifically today.
    {Field}
        [Field/name]
            todayActivities
        [Field/model]
            Thread
        [Field/type]
            o2m
        [Field/target]
            Activity
        [Field/compute]
            @record
            .{Thread/activities}
            .{Collection/filter}
                {func}
                    [in]
                        item
                    [out]
                        @activity
                        .{Activity/state}
                        .{=}
                            today
`;

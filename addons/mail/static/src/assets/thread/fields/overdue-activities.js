/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        States the 'Activity' that belongs to 'this' and that are
        overdue (due earlier than today).
    {Field}
        [Field/name]
            overdueActivities
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
                        @item
                        .{Activity/state}
                        .{=}
                            overdue
`;

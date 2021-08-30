/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        States the 'Activity' that belongs to 'this' and that are
        planned in the future (due later than today).
    {Field}
        [Field/name]
            futureActivities
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
                            planned
`;

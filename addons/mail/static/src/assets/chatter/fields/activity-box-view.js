/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            activityBoxView
        [Field/model]
            Chatter
        [Field/type]
            o2o
        [Field/target]
            ActivityBoxView
        [Field/isCausal]
            true
        [Field/inverse]
            ActivityBoxView/chatter
        [Field/compute]
            {if}
                @record
                .{Chatter/thread}
                .{&}
                    @record
                    .{Chatter/thread}
                    .{Thread/hasActivities}
                .{&}
                    @record
                    .{Chatter/thread}
                    .{Thread/activities}
                    .{Collection/length}
                    .{>}
                        0
            .{then}
                {Record/insert}
                    [Record/traits]
                        ActivityBoxView
            .{else}
                {Record/empty}
`;

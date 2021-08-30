/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Test}
        [Test/name]
            layout when planned tomorrow
        [Test/model]
            ActivityComponent
        [Test/assertions]
            4
        [Test/scenario]
            :testEnv
                {Record/insert}
                    [Record/traits]
                        Env
            @testEnv
            .{Record/insert}
                [Record/traits]
                    Server
                [Server/data]
                    @record
                    .{Test/data}
            :today
                {Record/insert}
                    [Record/traits]
                        Date
            :tomorrow
                {Record/insert}
                    [Record/traits]
                        Date
                .{Date/setDate}
                    @today
                    .{Date/getDate}
                    .{+}
                        1
            :activity
                @testEnv
                .{Record/insert}
                    [Record/traits]
                        Activity
                    [Activity/dateDeadline]
                        {Date/toString}
                            @tomorrow
                    [Activity/id]
                        12
                    [Activity/state]
                        planned
                    [Activity/thread]
                        @testEnv
                        .{Record/insert}
                            [Record/traits]
                                Record
                            [Thread/id]
                                42
                            [Thread/model]
                                res.partner
            @testEnv
            .{Record/insert}
                [Record/traits]
                    ActivityComponent
                [ActivityComponent/activity]
                    @activity
            {Test/assert}
                []
                    @activity
                    .{Activity/activityComponents}
                    .{Collection/length}
                    .{=}
                        1
                []
                    should have activity component
            {Test/assert}
                []
                    @activity
                    .{Activity/activityComponents}
                    .{Collection/first}
                    .{ActivityComponent/dueDateText}
                []
                    should have activity delay
            {Test/assert}
                []
                    @activity
                    .{Activity/state}
                    .{=}
                        planned
                []
                    activity should be planned
            {Test/assert}
                []
                    @activity
                    .{Activity/activityComponents}
                    .{Collection/first}
                    .{web.Element/textContent}
                    .{=}
                        Tomorrow:
                []
                    activity delay should have 'Tomorrow:' as label
`;

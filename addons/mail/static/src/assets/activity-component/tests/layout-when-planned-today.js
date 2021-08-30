/** @odoo-module **/

import { Define } from '@mail/define';

import { date_to_str } from 'web.time';

export default Define`
    {Test}
        [Test/name]
            layout when planned today
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
                {Record/insert}
                    [Record/traits]
                        Server
                [Server/data]
                    @record
                    .{Test/data}
            :today
                {Record/insert}
                    [Record/traits]
                        Date
            :activity
                @testEnv
                .{Record/insert}
                    [Record/traits]
                        Activity
                    [Activity/dateDeadline]
                        {Date/toString}
                            @today
                    [Activity/id]
                        12
                    [Activity/state]
                        today
                    [Activity/thread]
                        @testEnv
                        .{Record/insert}
                            [Record/traits]
                                Thread
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
                        today
                []
                    activity should be today
            {Test/assert}
                []
                    @activity
                    .{Activity/activityComponents}
                    .{Collection/first}
                    .{ActivityComponent/dueDateText}
                    .{web.Element/textContent}
                    .{=}
                        Today:
                []
                    activity delay should have 'Today:' as label
`;

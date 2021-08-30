/** @odoo-module **/

import { Define } from '@mail/define';

import { date_to_str } from 'web.time';

export default Define`
    {Test}
        [Test/name]
            layout when planned yesterday
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
            :yesterday
                {Record/insert}
                    [Record/traits]
                        Date
                .{Date/setDate}
                    @today
                    .{Date/getDate}
                    .{-}
                        1
            :activity
                @testEnv
                .{Record/insert}
                    [Record/traits]
                        Activity
                    [Activity/dateDeadline]
                        {Date/toString}
                            @yesterday
                    [Activity/id]
                        12
                    [Activity/state]
                        overdue
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
                        overdue
                []
                    activity should be overdue
            {Test/assert}
                []
                    @activity
                    .{Activity/activityComponents}
                    .{Collection/first}
                    .{ActivityComponent/dueDateText}
                    .{web.Element/textContent}
                    .{=}
                        Yesterday:
                []
                    activity delay should have 'Yesterday:' as label
`;

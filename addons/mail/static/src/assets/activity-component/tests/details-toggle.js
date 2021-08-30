/** @odoo-module **/

import { Define } from '@mail/define';

import { date_to_str } from 'web.time';

export default Define`
    {Test}
        [Test/name]
            details toggle
        [Test/model]
            ActivityComponent
        [Test/assertions]
            5
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
                    [Activity/creator]
                        @testEnv
                        .{Record/insert}
                            [Record/traits]
                                User
                            [User/displayName]
                                Admin
                            [User/id]
                                1
                    [Activity/dateCreate]
                        {Date/toString}
                            @today
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
                                Thread
                            [Thread/id]
                                42
                            [Thread/model]
                                res.partner
                    [Activity/type]
                        @testEnv
                        .{Record/insert}
                            [Record/traits]
                                ActivityType
                            [ActivityType/displayName]
                                Fake type
                            [ActivityType/id]
                                1
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
                    .{ActivityComponent/details}
                    .{isFalsy}
                []
                    activity details should not be visible by default
            {Test/assert}
                []
                    @activity
                    .{Activity/activityComponents}
                    .{Collection/first}
                    .{ActivityComponent/detailsButton}
                []
                    activity should have a details button

            @testEnv
            .{Component/afterNextRender}
                {func}
                    @testEnv
                    .{UI/click}
                        @activity
                        .{Activity/activityComponents}
                        .{Collection/first}
                        .{ActivityComponent/detailsButton}
            {Test/assert}
                []
                    @activity
                    .{Activity/activityComponents}
                    .{Collection/first}
                    .{ActivityComponent/details}
                []
                    activity details should be visible after clicking on details button

            @testEnv
            .{Component/afterNextRender}
                {func}
                    @testEnv
                    .{UI/click}
                        @activity
                        .{Activity/activityComponents}
                        .{Collection/first}
                        .{ActivityComponent/detailsButton}
            {Test/assert}
                []
                    @activity
                    .{Activity/activityComponents}
                    .{Collection/first}
                    .{ActivityComponent/details}
                    .{isFalsy}
                []
                    activity details should no longer be visible after clicking again on details button
`;

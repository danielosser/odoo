/** @odoo-module **/

import { Define } from '@mail/define';

import { date_to_str } from 'web.time';

export default Define`
    {Test}
        [Test/name]
            details layout
        [Test/model]
            ActivityComponent
        [Test/assertions]
            11
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
                    [Activity/assignee]
                        @testEnv
                        .{Record/insert}
                            [Record/traits]
                                User
                            [User/displayName]
                                Pauvre pomme
                            [User/id]
                                10
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
                            [ActivityType/id]
                                1
                            [ActivityType/displayName]
                                Fake type
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
                    .{ActivityComponent/userAvatar}
                []
                    should have activity user avatar
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
            {Test/assert}
                []
                    @activity
                    .{Activity/activityComponents}
                    .{Collection/first}
                    .{ActivityComponent/descriptionDetailType}
                []
                    activity details should have type
            {Test/assert}
                []
                    @activity
                    .{Activity/activityComponents}
                    .{Collection/first}
                    .{ActivityComponent/descriptionDetailType}
                    .{web.Element/textContent}
                    .{=}
                        Fake type
                []
                    activity details type should be 'Fake type'
            {Test/assert}
                []
                    @activity
                    .{Activity/activityComponents}
                    .{Collection/first}
                    .{ActivityComponent/detailsCreation}
                []
                    activity details should have creation date
            {Test/assert}
                []
                    @activity
                    .{Activity/activityComponents}
                    .{Collection/first}
                    .{ActivityComponent/detailsCreator}
                []
                    activity details should have creator
            {Test/assert}
                []
                    @activity
                    .{Activity/activityComponents}
                    .{Collection/first}
                    .{ActivityComponent/detailsAssignation}
                []
                    activity details should have assignation information
            {Test/assert}
                []
                    @activity
                    .{Activity/activityComponents}
                    .{Collection/first}
                    .{ActivityComponent/detailsAssignation}
                    .{web.Element/textContent}
                    .{String/startsWith}
                        Pauvre pomme
                []
                    activity details assignation information should contain creator display name
            {Test/assert}
                []
                    @activity
                    .{Activity/activityComponents}
                    .{Collection/first}
                    .{ActivityComponent/detailsAssignationUserAvatar}
                []
                    activity details should have user avatar
`;

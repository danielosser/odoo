/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Test}
        [Test/name]
            mark as done popover should focus feedback input on open
        [Test/model]
            ActivityComponent
        [Test/isFocusRequired]
            true
        [Test/assertions]
            3
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
                    [Activity/canWrite]
                        true
                    [Activity/category]
                        not_upload_file
                    [Activity/id]
                        12
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
                    .{ActivityComponent/markDoneButton}
                []
                    should have activity Mark as Done button

            @testEnv
            .{Component/afterNextRender}
                {func}
                    @testEnv
                    .{UI/click}
                        @activity
                        .{Activity/activityComponents}
                        .{Collection/first}
                        .{ActivityComponent/markDoneButton}
            {Test/assert}
                []
                    @activity
                    .{Activity/activityMarkDonePopoverComponents}
                    .{Collection/first}
                    .{ActivityMarkDonePopoverComponent/feedback}
                    .{=}
                        @document
                        .{Document/activeElement}
                []
                    the popover textarea should have the focus
`;

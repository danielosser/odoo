/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Test}
        [Test/name]
            summary layout
        [Test/model]
            ActivityComponent
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
            :activity
                @testEnv
                .{Record/insert}
                    [Record/traits]
                        Activity
                    [Activity/id]
                        12
                    [Activity/summary]
                        test summary
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
                    .{ActivityComponent/note}
                    .{isFalsy}
                []
                    should not have the activity type as summary
            {Test/assert}
                []
                    @activity
                    .{Activity/activityComponents}
                    .{Collection/first}
                    .{ActivityComponent/type}
                    .{web.Element/textContent}
                    .{=}
                        “test summary”
                []
                    should have the specific activity summary in activity summary
`;

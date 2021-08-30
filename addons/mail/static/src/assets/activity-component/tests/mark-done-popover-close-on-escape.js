/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Test}
        [Test/name]
            mark done popover close on ESCAPE
        [Test/model]
            ActivityComponent
        [Test/assertions]
            2
        [Test/scenario]
            {Dev/comment}
                This test is not in activity_mark_done_popover_tests.js as it
                requires the activity mark done component to have a parent in
                order to allow testing interactions the popover.
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
                    .{Collection/length}
                    .{=}
                        1
                []
                    Popover component should be present

            @testEnv
            .{Component/afterNextRender}
                {func}
                    @testEnv
                    .{UI/keydown}
                        [0]
                            @activity
                            .{Activity/activityMarkDonePopoverComponents}
                            .{Collection/first}
                        [1]
                            [bubbles]
                                true
                            [key]
                                Escape
            {Test/assert}
                @activity
                .{Activity/activityMarkDonePopoverComponents}
                .{Collection/length}
                .{=}
                    0
`;

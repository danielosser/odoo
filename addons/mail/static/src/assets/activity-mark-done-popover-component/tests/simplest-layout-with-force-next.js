/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Test}
        [Test/name]
            simplest layout with force next
        [Test/model]
            ActivityMarkDonePopoverComponent
        [Test/assertions]
            6
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
                    [Activity/canWrite]
                        true
                    [Activity/category]
                        not_upload_file
                    [Activity/chainingType]
                        trigger
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
                    ActivityMarkDonePopoverComponent
                [ActivityMarkDonePopoverComponent/activity]
                    @activity
            {Test/assert}
                []
                    @activity
                    .{Activity/activityMarkDonePopoverComponents}
                    .{Collection/length}
                    .{=}
                        1
                []
                    Popover component should be present
            {Test/assert}
                []
                    @activity
                    .{Activity/activityMarkDonePopoverComponents}
                    .{Collection/first}
                    .{ActivityMarkDonePopoverComponent/feedback}
                []
                    Popover component should contain the feedback textarea
            {Test/assert}
                []
                    @activity
                    .{Activity/activityMarkDonePopoverComponents}
                    .{Collection/first}
                    .{ActivityMarkDonePopoverComponent/buttons}
                []
                    Popover component should contain the action buttons
            {Test/assert}
                []
                    @activity
                    .{Activity/activityMarkDonePopoverComponents}
                    .{Collection/first}
                    .{ActivityMarkDonePopoverComponent/doneScheduleNextButton}
                []
                    Popover component should contain the done & schedule next button
            {Test/assert}
                []
                    @activity
                    .{Activity/activityMarkDonePopoverComponents}
                    .{Collection/first}
                    .{ActivityMarkDonePopoverComponent/doneButton}
                    .{isFalsy}
                []
                    Popover component should NOT contain the done button
            {Test/assert}
                []
                    @activity
                    .{Activity/activityMarkDonePopoverComponents}
                    .{Collection/first}
                    .{ActivityMarkDonePopoverComponent/discardButton}
                []
                    Popover component should contain the discard button
`;

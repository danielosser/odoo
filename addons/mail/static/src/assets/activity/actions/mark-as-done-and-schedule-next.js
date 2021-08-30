/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Action}
        [Action/name]
            Activity/markAsDoneAndScheduleNext
        [Action/params]
            activity
            feedback
        [Action/behavior]
            :action
                {Record/doAsync}
                    @activity
                    {func}
                        @env
                        .{Env/owlEnv}
                        .{Dict/get}
                            services
                        .{Dict/get}
                            rpc
                        .{Function/call}
                            [model]
                                mail.activity
                            [method]
                                action_feedback_schedule_next
                            [args]
                                {Record/insert}
                                    [Record/traits]
                                        Collection
                                    {Record/insert}
                                        [Record/traits]
                                            Collection
                                        @activity
                                        .{Activity/id}
                            [kwargs]
                                [feedback]
                                    @feedback
            {Thread/refresh}
                @activity
                .{Activity/thread}
            {Record/delete}
                @activity
            {if}
                @action
                .{isFalsy}
            .{then}
                {Thread/refreshActivities}
                    @activity
                    .{Activity/thread}
            .{else}
                @env
                .{Env/owlEnv}
                .{Dict/get}
                    bus
                .{Dict/get}
                    trigger
                .{Function/call}
                    [0]
                        do-action
                    [1]
                        [action]
                            @action
                        [options]
                            [on_close]
                                {function}
                                    {Thread/refreshActivities}
                                        @activity
                                        .{Activity/thread}
`;

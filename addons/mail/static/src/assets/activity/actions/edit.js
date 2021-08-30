/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        Opens (legacy) form view dialog to edit current activity and updates
        the activity when dialog is closed.
    {Action}
        [Action/name]
            Activity/edit
        [Action/params]
            activity
        [Action/behavior]
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
                        [type]
                            ir.actions.act_window
                        [name]
                            {Locale/text}
                                Schedule Activity
                        [res_model]
                            mail.activity
                        [view_mode]
                            form
                        [views]
                            [0]
                                [0]
                                    false
                                [1]
                                    form
                        [target]
                            new
                        [context]
                            [default_res_id]
                                @activity
                                .{Activity/thread}
                                .{Thread/id}
                            [default_res_model]
                                @activity
                                .{Activity/thread}
                                .{Thread/model}
                        [res_id]
                            @activity
                            .{Activity/id}
                    [options]
                        [on_close]
                            {func}
                                {Activity/fetchAndUpdate}
                                    @activity
`;

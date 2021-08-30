/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Action}
        [Action/name]
            MailTemplate/preview
        [Action/params]
            activity
                [type]
                    Activity
            mailTemplate
                [type]
                    MailTemplate
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
                        [name]
                            {Locale/text}
                                Compose Email
                        [type]
                            ir.actions.act_window
                        [res_model]
                            mail.compose.message
                        [views]
                            [0]
                                [0]
                                    false
                                [1]
                                    form
                        [target]
                            new
                        [context]
                            [default_model]
                                @activity
                                .{Activity/thread}
                                .{Thread/model}
                            [default_res_id]
                                @activity
                                .{Activity/thread}
                                .{Thread/id}
                            [default_template_id]
                                @mailTemplate
                                .{MailTemplate/id}
                            [default_use_template]
                                true
                            [force_email]
                                true
                    [options]
                        [on_close]
                            {func}
                                {Thread/refresh}
                                    @activity
                                    .{Activity/thread}
`;

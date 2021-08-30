/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Action}
        [Action/name]
            MailTemplate/send
        [Action/params]
            activity
                [type]
                    Activity
            mailTemplate
                [type]
                    MailTemplate
        [Action/behavior]
            {Record/doAsync}
                [0]
                    @mailTemplate
                [1]
                    {func}
                        @env
                        .{Env/owlEnv}
                        .{Dict/get}
                            services
                        .{Dict/get}
                            rpc
                        .{Function/call}
                            [model]
                                @activity
                                .{Activity/thread}
                                .{Thread/model}
                            [method]
                                activity_send_mail
                            [args]
                                {Record/insert}
                                    [Record/traits]
                                        Collection
                                    [0]
                                        @activity
                                        .{Activity/thread}
                                        .{Thread/id}
                                    [1]
                                        @mailTemplate
                                        .{MailTemplate/id}
            {Thread/refresh}
                @activity
                .{Activity/thread}
`;

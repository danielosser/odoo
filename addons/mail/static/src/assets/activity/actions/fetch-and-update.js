/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Action}
        [Action/name]
            Activity/fetchAndUpdate
        [Action/params]
            activity
            attachments
            [feedback]
                [default]
                    false
        [Action/behavior]
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
                            action_feedback
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
                            [attachment_ids]
                                @attachments
                                .{Collection/map}
                                    {func}
                                        [in]
                                            item
                                        [out]
                                            @item
                                            .{Attachment/id}
                            [feedback]
                                @feedback
            {Thread/refresh}
                @activity
                .{Activity/thread}
            {Record/delete}
                @activity
`;

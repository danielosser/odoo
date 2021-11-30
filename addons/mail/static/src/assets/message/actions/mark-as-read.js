/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        Mark this message as read, so that it no longer appears in current
        partner Inbox.
    {Action}
        [Action/name]
            Message/markAsRead
        [Action/params]
            message
                [type]
                    Message
        [Action/behavior]
            {Record/doAsync}
                [0]
                    @message
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
                                mail.message
                            [method]
                                set_message_done
                            [args]
                                {Record/insert}
                                    [Record/traits]
                                        Collection
                                    {Record/insert}
                                        [Record/traits]
                                            Collection
                                        @message
                                        .{Message/id}
`;

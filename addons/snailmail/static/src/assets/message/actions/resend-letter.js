/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        Retries to send the 'snailmail.letter' corresponding to this message.
    {Action}
        [Action/name]
            Message/resendLetter
        [Action/feature]
            snailmail
        [Action/params]
            message
                [type]
                    Message
        [Action/behavior]
            {Dev/comment}
                the result will come from longpolling: message_notification_update
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
                                send_letter
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

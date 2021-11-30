/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Action}
        [Action/name]
            MessagingNotificationHandler/_handleNotificationChannelJoined
        [Action/params]
            record
                [type]
                    MessagingNotificationHandler
            [channel]
                [type]
                    Thread
                [as]
                    channelData
            [invited_by_user_id]
                [type]
                    Integer
                [as]
                    invitedByUserId
        [Action/behavior]
            :channel
                {Record/insert}
                    [Record/traits]
                        Thread
                    {Thread/convertData}
                        @channelData
            {if}
                @invitedByUserId
                .{!=}
                    {Env/currentUser}
                    .{User/id}
            .{then}
                {Dev/comment}
                    Current user was invited by someone else.
                @env
                .{Env/owlEnv}
                .{Dict/get}
                    services
                .{Dict/get}
                    notification
                .{Dict/get}
                    notify
                .{Function/call}
                    [message]
                        {String/sprintf}
                            [0]
                                {Locale/text}
                                    You have been invited to #%s
                            [1]
                                @channel
                                .{Thread/displayName}
                    [type]
                        info
`;

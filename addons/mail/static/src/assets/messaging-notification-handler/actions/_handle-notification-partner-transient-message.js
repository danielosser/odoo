/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        On receiving a transient message, i.e. a message which does not come
        from a member of the channel. Usually a log message, such as one
        generated from a command with ('/').
    {Action}
        [Action/name]
            MessagingNotificationHandler/_handleNotificationPartnerTransientMessage
        [Action/params]
            notificationHandler
                [type]
                    MessagingNotificationHandler
            data
                [type]
                    Object
        [Action/behavior]
            :convertedData
                {Message/convertData}
                    @data
            :lastMessageId
                {Record/all}
                    [Record/traits]
                        Message
                .{Collection/reduce}
                    {func}
                        [in]
                            acc
                            item
                        [out]
                            {Math.max}
                                [0]
                                    @acc
                                [1]
                                    @item
                                    .{Message/id}
                    0
            :message
                {Record/insert}
                    [Record/traits]
                        Message
                    @convertedData
                    [Message/author]
                        {Env/partnerRoot}
                    [Message/id]
                        @lastMessageId
                        .{+}
                            0.01
                    [Message/isTransient]
                        true
            {MessagingNotificationHandler/_notifyThreadViewsMessageReceived}
                [0]
                    @notificationHandler
                [1]
                    @message
`;

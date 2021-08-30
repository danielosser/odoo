/** @odoo-module **/

import { Define } from '@mail/define';

import { Markup } from 'web.utils';

export default Define`
    {Action}
        [Action/name]
            MessagingNotificationHandler/_handleNotificationSimpleNotification
        [Action/params]
            record
                [type]
                    MessagingNotificationHandler
            message
                [type]
                    string
            message_is_html
                [type]
                    Boolean
            sticky
                [type]
                    Boolean
            title
                [type]
                    String
            warning
                [type]
                    Boolean
        [Action/behavior]
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
                    {if}
                        @message_is_html
                    .{then}
                        ${
                            Markup(
                                Define`
                                    @message
                                `,
                            )
                        }
                    .{else}
                        @message
                [sticky]
                    @sticky
                [title]
                    @title
                [type]
                    {if}
                        @warning
                    .{then}
                        warning
                    .{else}
                        danger
`;

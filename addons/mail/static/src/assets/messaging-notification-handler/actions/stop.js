/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Action}
        [Action/name]
            MessagingNotificationHandler/stop
        [Action/params]
            messagingNoticationHandler
                [type]
                    MessagingNotificationHandler
        [Action/behavior]
            @env
            .{Env/owlEnv}
            .{Dict/get}
                services
            .{Dict/get}
                bus_service
            .{Dict/get}
                off
            .{Function/call}
                notification
            @env
            .{Env/owlEnv}
            .{Dict/get}
                services
            .{Dict/get}
                bus_service
            .{Dict/get}
                stopPolling
            .{Function/call}
`;

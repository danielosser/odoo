/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Action}
        [Action/name]
            MessagingNotificationHandler/_handleNotificationRtcPeerToPeer
        [Action/params]
            sender
                [type]
                    String
            notifications
                [type]
                    Collection<String>
        [Action/behavior]
            {foreach}
                @notifications
            .{as}
                @content
            .{do}
                {Rtc/handleNotification}
                    @sender
                    @content
`;

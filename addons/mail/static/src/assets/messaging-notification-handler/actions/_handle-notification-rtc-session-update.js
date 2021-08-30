/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Action}
        [Action/name]
            MessagingNotificationHandler/_handleNotificationRtcSessionUpdate
        [Action/params]
            id
                [type]
                    Integer
            rtcSessions
                [type]
                    Object
        [Action/behavior]
            :channel
                {Record/findById}
                    [Thread/id]
                        @id
                    [Thread/model]
                        mail.channel
            {if}
                @channel
                .{isFalsy}
            .{then}
                {break}
            {Thread/updateRtcSessions}
                [0]
                    @channel
                [1]
                    @rtcSessions
`;

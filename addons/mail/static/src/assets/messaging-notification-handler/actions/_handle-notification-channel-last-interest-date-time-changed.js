/** @odoo-module **/

import { Define } from '@mail/define';

import { str_to_datetime } from 'web.time';

export default Define`
    {Action}
        [Action/name]
            MessagingNotificationHandler/_handleNotificationChannelLastInterestDateTimeChanged
        [Action/params]
            id
                [type]
                    Integer
            last_interest_dt
                [type]
                    String
            record
                [type]
                    MessagingNotificationHandler
        [Action/behavior]
            :channel
                {Record/findById}
                    [Thread/id]
                        @id
                    [Thread/model]
                        mail.channel
            {if}
                @channel
            .{then}
                {Record/update}
                    [0]
                        @channel
                    [1]
                        [Thread/lastInterestDateTime]
                            {String/toDatetime}
                                @last_interest_dt
`;

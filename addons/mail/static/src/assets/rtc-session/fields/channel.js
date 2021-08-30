/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        The mail.channel of the session, rtc sessions are part and managed by
        mail.channel
    {Field}
        [Field/name]
            channel
        [Field/model]
            RtcSession
        [Field/type]
            m2o
        [Field/target]
            Thread
        [Field/inverse]
            Thread/rtcSessions
`;

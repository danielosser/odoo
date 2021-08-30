/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        String, peerToken of the current session used to identify him during the peer-to-peer transactions.
    {Field}
        [Field/name]
            currentRtcSession
        [Field/model]
            Rtc
        [Field/type]
            o2o
        [Field/target]
            RtcSession
        [Field/inverse]
            RtcSession/rtc
`;

/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            rtcSessions
        [Field/model]
            Thread
        [Field/type]
            o2m
        [Field/target]
            RtcSession
        [Field/inverse]
            RtcSession/channel
        [Field/isCausal]
            true
`;

/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            rtcSessions
        [Field/model]
            Guest
        [Field/type]
            o2m
        [Field/target]
            RtcSession
        [Field/inverse]
            RtcSession/guest
`;

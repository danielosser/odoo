/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            guest
        [Field/model]
            RtcSession
        [Field/type]
            m2o
        [Field/target]
            Guest
        [Field/inverse]
            Guest/rtcSessions
`;

/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        The session that invited the current user, it is only set when the
        invitation is still pending.
    {Field}
        [Field/name]
            rtcInvitingSession
        [Field/model]
            Thread
        [Field/type]
            m2o
        [Field/target]
            RtcSession
        [Field/inverse]
            RtcSession/calledChannels
`;

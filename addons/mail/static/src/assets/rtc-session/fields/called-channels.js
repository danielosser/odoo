/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        Channels on which this session is inviting the current partner,
        this serves as an explicit inverse as it seems to confuse it with
        other session-channel relations otherwise.
    {Field}
        [Field/name]
            calledChannels
        [Field/model]
            RtcSession
        [Field/type]
            o2m
        [Field/target]
            Thread
        [Field/inverse]
            Thread/rtcInvitingSession
`;

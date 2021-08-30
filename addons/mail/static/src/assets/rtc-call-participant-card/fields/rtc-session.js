/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        If set, this card represents a rtcSession.
    {Field}
        [Field/name]
            rtcSession
        [Field/model]
            RtcCallParticipantCard
        [Field/type]
            m2o
        [Field/target]
            RtcSession
`;

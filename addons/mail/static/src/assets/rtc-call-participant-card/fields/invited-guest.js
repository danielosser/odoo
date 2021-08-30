/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        If set, this card represents an invitation of this guest to this call.
    {Field}
        [Field/name]
            invitedGuest
        [Field/model]
            RtcCallParticipantCard
        [Field/type]
            m2o
        [Field/target]
            Guest
`;

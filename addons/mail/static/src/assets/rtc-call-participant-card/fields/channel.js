/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        The channel of the call.
    {Field}
        [Field/name]
            channel
        [Field/model]
            RtcCallParticipantCard
        [Field/type]
            m2o
        [Field/target]
            Thread
        [Field/isRequired]
            true
`;

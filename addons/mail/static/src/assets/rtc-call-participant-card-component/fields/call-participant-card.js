/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            callParticipantCard
        [Field/model]
            RtcCallParticipantCardComponent
        [Field/type]
            m2o
        [Field/target]
            RtcCallParticipantCard
        [Field/isRequired]
            true
`;

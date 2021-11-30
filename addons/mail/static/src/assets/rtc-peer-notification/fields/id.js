/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        States the id of this RTC peer notification. This id does not
        correspond to any specific value, it is just a unique identifier
        given by the creator of this record.
    {Field}
        [Field/name]
            id
        [Field/model]
            RtcPeerNotification
        [Field/isReadonly]
            true
        [Field/isRequired]
            true
`;

/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            payload
        [Field/model]
            RtcPeerNotification
        [Field/isReadonly]
            true
`;

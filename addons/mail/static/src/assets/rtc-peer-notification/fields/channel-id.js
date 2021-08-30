/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            channelId
        [Field/model]
            RtcPeerNotification
        [Field/isReadonly]
            true
        [Field/isRequired]
            true
`;

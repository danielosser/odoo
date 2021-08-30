/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            targetTokens
        [Field/model]
            RtcPeerNotification
        [Field/isReadonly]
            true
        [Field/isRequired]
            true
`;

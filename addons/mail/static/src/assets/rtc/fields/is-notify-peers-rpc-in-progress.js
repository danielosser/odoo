/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            isNotifyPeersRPCInProgress
        [Field/model]
            Rtc
        [Field/type]
            attr
        [Field/target]
            Boolean
        [Field/default]
            false
`;

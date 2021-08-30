/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            peerNotificationsToSend
        [Field/model]
            Rtc
        [Field/type]
            o2m
        [Field/target]
            RtcPeerNotification
        [Field/isCausal]
            true
`;

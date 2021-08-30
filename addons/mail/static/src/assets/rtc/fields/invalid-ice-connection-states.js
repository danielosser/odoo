/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        list of connection states considered invalid, which means that
        no action should be taken on such peerConnection.
    {Field}
        [Field/name]
            invalidIceConnectionStates
        [Field/model]
            Rtc
        [Field/type]
            attr
        [Field/target]
            Set
        [Field/isReadonly]
            true
        [Field/default]
            {Record/insert}
                [Record/traits]
                    Set
                disconnected
                failed
                closed
`;

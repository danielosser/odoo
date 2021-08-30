/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        Object { token: dataChannel<RTCDataChannel> }
        Contains the RTCDataChannels with the other rtc sessions.
    {Field}
        [Field/name]
            _dataChannels
        [Field/model]
            Rtc
        [Field/type]
            attr
        [Field/target]
            Dict
        [Field/default]
            {Record/insert}
                [Record/traits]
                    Dict
`;

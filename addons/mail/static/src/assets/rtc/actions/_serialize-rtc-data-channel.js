/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        Returns a string representation of a data channel for logging and
        debugging purposes.
    {Action}
        [Action/name]
            Rtc/_serializeRTCDataChannel
        [Action/params]
            dataChannel
                [type]
                    RTCDataChannel
            record
                [type]
                    Rtc
        [Action/returns]
            String
        [Action/behavior]
            {JSON/stringify}
                {Object/fromEntries}
                    {Record/insert}
                        [Record/traits]
                            Collection
                        binaryType
                        bufferedAmount
                        bufferedAmountLowThreshold
                        id
                        label
                        maxPacketLifeTime
                        maxRetransmits
                        negotiated
                        ordered
                        protocol
                        readyState
                    .{Collection/map}
                        {func}
                            [in]
                                p
                            [out]
                                {Record/insert}
                                    [Record/traits]
                                        Collection
                                    [0]
                                        @p
                                    [1]
                                        @dataChannel
                                        .{Dict/get}
                                            @p
`;

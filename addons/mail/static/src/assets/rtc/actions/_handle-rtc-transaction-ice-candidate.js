/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Action}
        [Action/name]
            Rtc/_handleRtcTransactionICECandidate
        [Action/params]
            fromToken
                [type]
                    String
            candidate
                [type]
                    RTCIceCandidateInit
            record
                [type]
                    Rtc
        [Action/behavior]
            :peerConnection
                @record
                .{RTC/_peerConnections}
                .{Collection/at}
                    @fromToken
            {if}
                @peerConnection
                .{isFalsy}
                .{|}
                    {Set/has}
                        [0]
                            @record
                            .{Rtc/invalidIceConnectionStates}
                        [1]
                            @peerConnection
                            .{RTCPeerConnection/connectionState}
            .{then}
                {break}
            :rtcIceCandidate
                {Record/insert}
                    [Record/traits]
                        RTCIceCandidate
                    @candidate
            {try}
                {RTCPeerConnection/addIceCandidate}
                    [0]
                        @peerConnection
                    [1]
                        @rtcIceCandidate
            .{catch}
                {func}
                    [in]
                        error
                    [out]
                        {Rtc/_addLogEntry}
                            [0]
                                @record
                            [1]
                                @fromToken
                            [2]
                                Ice candidate handling: failed at adding the candidate to the connection
                            [3]
                                [error]
                                    @error
                        {Rtc/_recoverConnection}
                            [0]
                                @record
                            [1]
                                @fromToken
                            [2]
                                [delay]
                                    @record
                                    .{Rtc/recoveryTimeout}
                                [reason]
                                    failed at adding ice candidate
`;

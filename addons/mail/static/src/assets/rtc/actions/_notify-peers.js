/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Action}
        [Action/name]
            Rtc/_notifyPeers
        [Action/params]
            targetTokens
                [type]
                    Collection<String>
            event
                [type]
                    String
            payload
                [type]
                    Object
            type
                [type]
                    String
                [description]
                    'server' or 'peerToPeer',
                    'peerToPeer' requires an active RTCPeerConnection
            record
                [type]
                    Rtc
        [Action/behavior]
            {if}
                @targetTokens
                .{Collection/length}
                .{=}
                    0
                .{|}
                    @record
                    .{Rtc/channel}
                    .{isFalsy}
                .{|}
                    @record
                    .{Rtc/currentRtcSession}
                    .{isFalsy}
            .{then}
                {break}
            {if}
                @type
                .{=}
                    server
            .{then}
                {Record/update}
                    [0]
                        @record
                    [1]
                        [Rtc/peerNotificationsToSend]
                            {Record/insert}
                                [Record/traits]
                                    RtcPeerNotification
                                [RtcPeerNotification/channelId]
                                    @record
                                    .{Rtc/channel}
                                    .{Thread/id}
                                [RtcPeerNotification/event]
                                    @event
                                [RtcPeerNotification/id]
                                    {RtcPeerNotification/getRTCPeerNotificationNextTemporaryId}
                                [RtcPeerNotification/payload]
                                    @payload
                                [RtcPeerNotification/senderId]
                                    @record
                                    .{Rtc/currentRtcSession}
                                    .{RtcSession/id}
                                [RtcPeerNotification/targetTokens]
                                    @targetTokens
                {Rtc/_sendPeerNotifications}
                    @record
            {if}
                @type
                .{=}
                    peerToPeer
            .{then}
                {foreach}
                    @targetTokens
                .{as}
                    token
                .{do}
                    :dataChannel
                        @record
                        .{Rtc/_dataChannels}
                        .{Collection/at}
                            @token
                    {if}
                        @dataChannel
                        .{isFalsy}
                        .{|}
                            @dataChannel
                            .{DataChannel/readyState}
                            .{!=}
                                open
                    .{then}
                        {continue}
                    {DataChannel/send}
                        [0]
                            @dataChannel
                        [1]
                            {JSON/stringify}
                                [event]
                                    @event
                                [channelId]
                                    @record
                                    .{Rtc/channel}
                                    .{Thread/id}
                                [payload]
                                    @payload
`;

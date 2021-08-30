/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        Mutes and unmutes the microphone, will not unmute if deaf.
    {Action}
        [Action/name]
            Rtc/toggleMicrophone
        [Action/params]
            requestAudioDevice
                [type]
                    Boolean
                [default]
                    true
                [description]
                    true if requesting the audio input device from the user
            record
                [type]
                    Rtc
        [Action/behavior]
            :shouldMute
                @record
                .{Rtc/currentRtcSession}
                .{RtcSession/isDeaf}
                .{|}
                    @record
                    .{Rtc/currentRtcSession}
                    .{RtcSession/isMuted}
                    .{isFalsy}
            {RtcSession/updateAndBroadcast}
                [0]
                    record
                    .{Rtc/currentRtcSession}
                [1]
                    [isMuted]
                        @shouldMute
                        .{|}
                            @record
                            .{Rtc/audioTrack}
                            .{isFalsy}
            {if}
                @record
                .{Rtc/audioTrack}
                .{isFalsy}
                .{&}
                    @shouldMute
                    .{isFalsy}
                .{&}
                    @requestAudioDevice
            .{then}
                {Dev/comment}
                    if we don't have an audioTrack, we try to request it again
                {Rtc/updateLocalAudioTrack}
                    [0]
                        @record
                    [1]
                        true
            {Record/doAsync}
                [0]
                    @record
                [1]
                    {Rtc/_updateLocalAudioTrackEnabledState}
                        @record
`;

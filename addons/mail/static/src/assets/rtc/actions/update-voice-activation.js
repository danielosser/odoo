/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        Updates the way broadcast of the local audio track is handled,
        attaches an audio monitor for voice activation if necessary.
    {Action}
        [Action/name]
            Rtc/updateVoiceActivation
        [Action/params]
            record
                [type]
                    Rtc
        [Action/behavior]
            {if}
                {Rtc/_disconnectAudioMonitor}
            .{then}
                {Rtc/_disconnectAudioMonitor}
                .{Function/call}
            {if}
                {Env/userSetting}
                .{UserSetting/usePushToTalk}
                .{|}
                    {Rtc/channel}
                    .{isFalsy}
                .{|}
                    {Rtc/audioTrack}
                    .{isFalsy}
            .{then}
                {Record/update}
                    [0]
                        {Rtc/currentRtcSession}
                    [1]
                        [RtcSession/isTalking]
                            false
                {break}
            {try}
                {Record/update}
                    [0]
                        @record
                    [1]
                        [Rtc/_disconnectAudioMonitor]
                            {MediaMonitoring/monitorAudio}
                                [0]
                                    @record
                                    .{Rtc/audioTrack}
                                [1]
                                    [onThreshold]
                                        {func}
                                            [in]
                                                isAboveThreshold
                                            [out]
                                                {Rtc/_setSoundBroadcast}
                                                    @isAboveThreshold
                                    [volumeThreshold]
                                        {Env/userSetting}
                                        .{UserSetting/voiceActivationThreshold}
            .{catch}
                {func}
                    [in]
                        error
                    [out]
                        {Dev/comment}
                            The browser is probably missing audioContext,
                            in that case, voice activation is not enabled
                            and the microphone is always 'on'.
                        @env
                        .{Env/owlEnv}
                        .{Dict/get}
                            services
                        .{Dict/get}
                            notification
                        .{Dict/get}
                            notify
                        .{Function/call}
                            [message]
                                {Locale/text}
                                    Your browser does not support voice activation
                            [type]
                                warning
                        {Record/update}
                            [0]
                                {Rtc/currentRtcSession}
                            [1]
                                [RtcSession/isTalking]
                                    true
`;

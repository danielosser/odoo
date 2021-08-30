/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        Updates the mail.rtc_session associated to the token with a new track.
    {Action}
        [Action/name]
            Rtc/_updateExternalSessionTrack
        [Action/params]
            track
                [type]
                    Track
            token
                [type]
                    String
            record
                [type]
                    Rtc
        [Action/behavior]
            :rtcSession
                {Record/findById}
                    [RtcSession/id]
                        @token
            {if}
                @rtcSession
                .{isFalsy}
            .{then}
                {break}
            :stream
                {Record/insert}
                    [Record/traits]
                        MediaStream
            {MediaStream/add}
                [0]
                    @stream
                [1]
                    @track
            {if}
                @track
                {Track/kind}
                .{=}
                    audio
            .{then}
                {RtcSession/setAudio}
                    [0]
                        @rtcSession
                    [1]
                        [audioStream]
                            @stream
                        [isMuted]
                            false
                        [isTalking]
                            false
            {if}
                @track
                .{Track/kind}
                .{=}
                    video
            .{then}
                {Record/update}
                    [0]
                        @rtcSession
                    [1]
                        [RtcSession/videoStream]
                            @stream
`;

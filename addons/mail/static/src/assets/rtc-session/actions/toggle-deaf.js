/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        Toggles the deaf state of the current session, this must be a session
        of the current partner.
    {Action}
        [Action/name]
            RtcSession/toggleDeaf
        [Action/params]
            record
                [type]
                    RtcSession
        [Action/behavior]
            {if}
                @record
                .{RtcSession/rtc}
                .{isFalsy}
            .{then}
                {break}
            {RtcSession/updateAndBroadcast}
                [0]
                    @record
                [1]
                    [isDeaf]
                        @record
                        .{RtcSession/isDeaf}
                        .{isFalsy}
            {foreach}
                {Record/all}
                    [Record/traits]
                        RtcSession
            .{as}
                session
            .{do}
                {if}
                    @session
                    .{RtcSession/audioElement}
                    .{isFalsy}
                .{then}
                    {continue}
                {Record/update}
                    [0]
                        @session
                        .{RtcSession/audioElement}
                    [1]
                        [Audio/muted]
                            @record
                            .{RtcSession/isDeaf}
            {if}
                @record
                .{RtcSession/channel}
                .{Thread/rtc}
            .{then}
                {Dev/comment}
                    Ensures that the state of the microphone matches the deaf state
                    and notifies peers.
                {Record/doAsync}
                    [0]
                        @record
                    [1]
                        {Rtc/toggleMicrophone}
                            [0]
                                @record
                                .{RtcSession/channel}
                                .{Thread/rtc}
                            [1]
                                [requestAudioDevice]
                                    false
`;

/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Action}
        [Action/name]
            Env/toggleFocusedRtcSession
        [Action/params]
            sessionId
                [type]
                    String
        [Action/behavior]
            :rtcSession
                {Record/findById}
                    [RtcSession/id]
                        @sessionId
            :focusedSessionId
                {Env/focusedRtcSession}
                .{&}
                    {Env/focusedRtcSession}
                    .{RtcSession/id}
            {if}
                @sessionId
                .{isFalsy}
                .{|}
                    @focusedSessionId
                    .{=}
                        @sessionId
            .{then}
                {Record/update}
                    [0]
                        @env
                    [1]
                        [Env/focusedRtcSession]
                            {Record/empty}
                {break}
            {Record/update}
                [0]
                    @env
                [1]
                    [Env/focusedRtcSession]
                        @rtcSession
            {if}
                {Env/userSetting}
                .{UserSetting/rtcLayout}
                .{!=}
                    tiled
            .{then}
                {break}
            {Record/update}
                [0]
                    {Env/userSetting}
                [1]
                    [UserSetting/rtcLayout]
                        sidebar
`;

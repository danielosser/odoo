/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            micButton
        [Element/model]
            RtcControllerComponent
        [Model/traits]
            RtcControllerComponent/button
        [Element/isPresent]
            @record
            .{RtcControllerComponent/rtcController}
            .{RtcController/callViewer}
            .{RtcCallViewer/threadView}
            .{TreadView/thread}
            .{Thread/rtc}
            .{&}
                {Rtc/currentRtcSession}
        [RtcControllerComponent/button/isActive]
            {Rtc/currentRtcSession}
            .{RtcSession/isMuted}
            .{isFalsy}
        [web.Element/aria-label]
            {if}
                {Rtc/currentRtcSession}
                .{RtcSession/isMuted}
            .{then}
                {Locale/text}
                    Unmute
            .{else}
                {Locale/text}
                    Mute
        [web.Element/title]
            {if}
                {Rtc/currentRtcSession}
                .{RtcSession/isMuted}
            .{then}
                {Locale/text}
                    Unmute
            .{else}
                {Locale/text}
                    Mute
        [Element/onClick]
            {RtcController/onClickMicrophone}
                [0]
                    {Rtc/currentRtcSession}
                [1]
                    @ev
`;

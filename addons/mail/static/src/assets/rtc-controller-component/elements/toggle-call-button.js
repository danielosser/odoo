/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            toggleCallButton
        [Element/model]
            RtcControllerComponent
        [Model/traits]
            RtcControllerComponent/callToggleButton
        [Element/isPresent]
            @record
            .{RtcControllerComponent/rtcController}
            .{RtcController/callViewer}
            .{RtcCallViewer/threadView}
            .{TreadView/thread}
        [RtcControllerComponent/callToggleButton/isActive]
            @record
            .{RtcControllerComponent/rtcController}
            .{RtcController/callViewer}
            .{RtcCallViewer/threadView}
            .{TreadView/thread}
            .{Thread/rtc}
            .{isTruthy}
        [web.Element/aria-label]
            {if}
                @record
                .{RtcControllerComponent/rtcController}
                .{RtcController/callViewer}
                .{RtcCallViewer/threadView}
                .{TreadView/thread}
                .{Thread/rtc}
            .{then}
                {Locale/text}
                    Disconnect
            .{else}
                {Locale/text}
                    Join Call
        [web.Element/title]
            {if}
                @record
                .{RtcControllerComponent/rtcController}
                .{RtcController/callViewer}
                .{RtcCallViewer/threadView}
                .{TreadView/thread}
                .{Thread/rtc}
            .{then}
                {Locale/text}
                    Disconnect
            .{else}
                {Locale/text}
                    Join Call
        [web.Element/isDisabled]
            @record
            .{RtcControllerComponent/rtcController}
            .{RtcController/callViewer}
            .{RtcCallViewer/threadView}
            .{TreadView/thread}
            .{Thread/hasPendingRtcRequest}
        [Element/onClick]
            {RtcController/onClickToggleAudioCall}
                [0]
                    {Rtc/currentRtcSession}
                [1]
                    @ev
`;

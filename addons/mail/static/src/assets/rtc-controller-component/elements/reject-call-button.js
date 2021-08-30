/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            rejectCallButton
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
            .{&}
                @record
                .{RtcControllerComponent/rtcController}
                .{RtcController/callViewer}
                .{RtcCallViewer/threadView}
                .{TreadView/thread}
                .{Thread/rtcInvitingSession}
            .{&}
                @record
                .{RtcControllerComponent/rtcController}
                .{RtcController/callViewer}
                .{RtcCallViewer/threadView}
                .{TreadView/thread}
                .{Thread/rtc}
                .{isFalsy}
        [RtcControllerComponent/button/isActive]
            true
        [web.Element/aria-label]
            {Locale/text}
                Reject
        [web.Element/title]
            {Locale/text}
                Reject
        [web.Element/isDisabled]
            @record
            .{RtcControllerComponent/rtcController}
            .{RtcController/callViewer}
            .{RtcCallViewer/threadView}
            .{TreadView/thread}
            .{Thread/hasPendingRtcRequest}
        [Element/onClick]
            {RtcController/onClickRejectCall}
                [0]
                    {Rtc/currentRtcSession}
                [1]
                    @ev
`;

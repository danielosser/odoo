/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            audioError
        [Element/model]
            RtcCallParticipantCardComponent
        [Model/traits]
            RtcCallParticipantCardComponent/overlayTopElement
        [Element/isPresent]
            @record
            .{RtcCallParticipantCardComponent/callParticipantCard}
            .{RtcCallParticipantCard/rtcSession}
            .{RtcSession/channel}
            .{Thread/rtc}
            .{&}
                @record
                .{RtcCallParticipantCardComponent/callParticipantCard}
                .{RtcCallParticipantCard/rtcSession}
                .{RtcSession/isAudioInError}
        [web.Element/title]
            {Locale/text}
                Issue with audio
        [web.Element/class]
            text-danger
`;

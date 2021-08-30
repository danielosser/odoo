/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            mic
        [Element/model]
            RtcCallParticipantCardComponent
        [Model/traits]
            RtcCallParticipantCardComponent/overlayTopElement
        [Element/isPresent]
            @record
            .{RtcCallParticipantCardComponent/callParticipantCard}
            .{RtcCallParticipantCard/rtcSession}
            .{RtcSession/isMuted}
        [web.Element/title]
            {Locale/text}
                muted
        [web.Element/aria-label]
            {Locale/text}
                muted
`;

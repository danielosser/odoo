/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            headphone
        [Element/model]
            RtcCallParticipantCardComponent
        [Model/traits]
            RtcCallParticipantCardComponent/overlayTopElement
        [Element/isPresent]
            @record
            .{RtcCallParticipantCardComponent/callParticipantCard}
            .{RtcCallParticipantCard/rtcSession}
            .{RtcSession/isDeaf}
        [web.Element/title]
            {Locale/text}
                deaf
        [web.Element/aria-label]
            {Locale/text}
                deaf
`;

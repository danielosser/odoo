/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            mainParticipantCard
        [Element/model]
            RtcCallViewerComponent
        [Element/isPresent]
            @record
            .{RtcCallViewerComponent/rtcCallViewer}
            .{RtcCallViewer/mainParticipantCard}
        [Model/traits]
            RtcCallViewerComponent/participantCard
        [web.Element/target]
            RtcCallParticipantCardComponent
        [Element/props]
            [RtcCallParticipantCardComponent/callParticipantCard]
                @record
                .{RtcCallViewerComponent/rtcCallViewer}
                .{RtcCallViewer/mainParticipantCard}
        [web.Element/class]
            w-100
`;

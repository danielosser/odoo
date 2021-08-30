/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        The callViewer for which this card is the spotlight.
    {Field}
        [Field/name]
            rtcCallViewerOfMainCard
        [Field/model]
            RtcCallParticipantCard
        [Field/type]
            o2o
        [Field/target]
            RtcCallViewer
        [Field/inverse]
            RtcCallViewer/mainParticipandCard
`;

/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        The callViewer for which this card is one of the tiles.
    {Field}
        [Field/name]
            rtcCallViewerOfTile
        [Field/model]
            RtcCallParticipantCard
        [Field/type]
            m2o
        [Field/target]
            RtcCallViewer
        [Field/inverse]
            RtcCallViewer/tileParticipantCards
`;

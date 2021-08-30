/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Model}
        [Model/name]
            RtcCallViewerComponent
        [Model/fields]
            columnCount
            rtcCallViewer
            tileHeight
            tileWidth
        [Model/template]
            root
                participantContainer
                    mainParticipantContainer
                        mainParticipantCard
                    grid
                        gridTile
                controls
                    controlsOverlayContainer
                        rtcController
                settings
                changeLayout
        [Model/actions]
            RtcCallViewerComponent/_computeTessellation
            RtcCallViewerComponent/_setTileLayout
        [Model/lifecycles]
            onUpdate
`;

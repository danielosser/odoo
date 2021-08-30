/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            controlsOverlayContainer
        [Element/model]
            RtcCallViewerComponent
        [Element/onMousemove]
            {RtcCallViewer/onMousemoveOverlay}
                [0]
                    @record
                    .{RtcCallViewerComponent/rtcCallViewer}
                [1]
                    @ev
`;

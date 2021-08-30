/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            rtcController
        [Element/model]
            RtcCallViewerComponent
        [web.Element/target]
            RtcControllerComponent
        [Element/props]
            [RtcControllerComponent/rtcController]
                @record
                .{RtcCallViewerComponent/rtcCallViewer}
                .{RtcCallViewer/rtcController}
`;

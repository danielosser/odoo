/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            rtcCallViewer
        [Element/model]
            ThreadViewComponent
        [Field/target]
            RtcCallViewerComponent
        [Element/isPresent]
            @record
            .{ThreadViewComponent/threadView}
            .{ThreadView/rtcCallViewer}
        [Element/props]
            [RtcCallViewerComponent/rtcCallViewer]
                @record
                .{ThreadViewComponent/threadView}
                .{ThreadView/rtcCallViewer}
`;

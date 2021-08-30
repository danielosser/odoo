/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            callIndicator
        [Element/model]
            ThreadPreviewComponent
        [Element/isPresent]
            @record
            .{ThreadPreviewComponent/thread}
            .{Thread/rtcSessions}
            .{Collection/length}
            .{>}
                0
        [web.Element/tag]
            span
        [web.Element/class]
            fa
            fa-volume-up
            mx-2
        [web.Element/style]
            {if}
                @record
                .{ThreadPreviewComponent/thread}
                .{Thread/rtc}
            .{then}
                [web.scss/color]
                    red
`;

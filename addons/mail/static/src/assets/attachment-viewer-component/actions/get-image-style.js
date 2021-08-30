/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        Compute the style of the image (scale + rotation).
    {Action}
        [Action/name]
            AttachmentViewerComponent/getImageStyle
        [Action/params]
            record
        [Action/behavior]
            :style
                transform: 
                .{+}
                    scale3d(
                .{+}
                    @record
                    .{AttachmentViewerComponent/record}
                    .{AttachmentViewer/scale}
                .{+}
                    }, 
                .{+}
                    @record
                    .{AttachmentViewerComponent/record}
                    .{AttachmentViewer/scale}
                .{+}
                    }, 1) 
                .{+}
                    rotate(
                .{+}
                    @record
                    .{AttachmentViewerComponent/record}
                    .{AttachmentViewer/angle}
                .{+}
                    deg);
            {if}
                @record
                .{AttachmentViewerComponent/record}
                .{AttachmentViewer/angle}
                .{%}
                    180
                .{!=}
                    0
            .{then}
                :style
                    @style
                    .{+}
                        max-height: 
                    .{+}
                        {Device/globalWindowInnerWidth}
                    .{+}
                        px; 
                    .{+}
                        max-width: 
                    .{+}
                        {Device/globalWindowInnerHeight}
                    .{+}
                        px;
            .{else}
                :style
                    @style
                    .{+}
                        max-height: 100%; 
                    .{+}
                        max-width: 100%;
            @style;
`;

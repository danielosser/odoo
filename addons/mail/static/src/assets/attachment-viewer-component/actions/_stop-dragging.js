/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        Stop dragging interaction of the user.
    {Action}
        [Action/name]
            AttachmentViewerComponent/_stopDragging
        [Action/params]
            record
        [Action/behavior]
            {Record/update}
                [0]
                    @record
                [1]
                    [AttachmentViewerComponent/isDragging]
                        false
                    [AttachmentViewerComponent/translateDx]
                        0
                    [AttachmentViewerComponent/translateDy]
                        0
                    [AttachmentViewerComponent/translateX]
                        {Field/add}
                            @record
                            .{AttachmentViewerComponent/translateDx}
                    [AttachmentViewerComponent/translateY]
                        {Field/add}
                            @record
                            .{AttachmentViewerComponent/translateDy}
            {AttachmentViewerComponent/_updateZoomerStyle}
                @record
`;

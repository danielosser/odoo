/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        Display the previous attachment in the list of attachments.
    {Action}
        [Action/name]
            AttachmentViewerComponent/_next
        [Action/params]
            record
        [Action/behavior]
            :index
                @record
                .{AttachmentViewerComponent/record}
                .{AttachmentViewer/attachments}
                .{Collection/findIndex}
                    {func}
                        [in]
                            item
                        [out]
                            @item
                            .{=}
                                @record
                                .{AttachmentViewerComponent/record}
                                .{AttachmentViewer/attachment}
            :nextIndex
                @index
                .{+}
                    1
                .{%}
                    @record
                    .{AttachmentViewerComponent/record}
                    .{AttachmentViewer/attachments}
                    .{Collection/length}
            {Record/update}
                [0]
                    @record
                    .{AttachmentViewerComponent/record}
                [1]
                    [AttachmentViewer/attachment]
                        @record
                        .{AttachmentViewerComponent/record}
                        .{AttachmentViewer/attachments}
                        .{Collection/at}
                            nextIndex
`;

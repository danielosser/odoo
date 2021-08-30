/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        Display the previous attachment in the list of attachments.
    {Action}
        [Action/name]
            AttachmentViewerComponent/_previous
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
                {if}
                    @index
                    .{=}
                        0
                .{then}
                    @record
                    .{AttachmentViewerComponent/record}
                    .{AttachmentViewer/attachments}
                    .{Collection/length}
                    .{-}
                        1
                .{else}
                    @index
                    .{-}
                        1
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
                            @nextIndex
`;

/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Action}
        [Action/name]
            AttachmentListComponent/imageAttachments
        [Action/params]
            record
        [Action/behavior]
            @record
            .{AttachmentListComponent/attachments}
            .{Collection/filter}
                {func}
                    [in]
                        item
                    [out]
                        @item
                        .{Attachment/isImage}
`;

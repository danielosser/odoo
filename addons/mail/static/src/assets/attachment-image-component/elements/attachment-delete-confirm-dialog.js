/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            attachmentDeleteConfirmDialog
        [Element/model]
            AttachmentImageComponent
        [Element/isPresent]
            @record
            .{AttachmentImageComponent/attachmentImage}
            .{AttachmentImage/hasDeleteConfirmDialog}
        [Field/target]
            AttachmentDeleteConfirmDialogComponent
        [Element/props]
            [AttachmentDeleteComfirmDialogComponent/attachment]
                @record
                .{AttachmentImageComponent/attachmentImage}
                .{AttachmentImage/attachment}
        [web.Element/on-dialog-closed]
            {AttachmentImage/onDeleteConfirmDialogClosed}
                [0]
                    @record
                    .{AttachmentImageComponent/attachmentImage}
                [1]
                    @ev
`;

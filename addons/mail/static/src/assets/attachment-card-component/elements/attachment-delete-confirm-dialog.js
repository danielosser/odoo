/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            attachmentDeleteConfirmDialog
        [Element/model]
            AttachmentCardComponent
        [Element/isPresent]
            @record
            .{AttachmentCardComponent/attachmentCard}
            .{AttachmentCard/hasDeleteConfirmDialog}
        [Field/target]
            AttachmentDeleteConfirmDialogComponent
        [Element/props]
            [AttachmentDeleteConfirmDialogComponent/attachment]
                @record
                .{AttachmentCardComponent/attachmentCard}
                .{AttachmentCard/attachment}
        [web.Element/t-on-dialog-closed]
            {AttachmentCard/onDeleteConfirmDialogClosed}
                [0]
                    @record
                    .{AttachmentCardComponent/attachmentCard}
                [1]
                    @ev
`;

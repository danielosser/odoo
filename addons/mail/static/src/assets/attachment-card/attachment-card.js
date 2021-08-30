/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Model}
        [Model/name]
            AttachmentCard
        [Model/fields]
            attachment
            attachmentList
            component
            hasDeleteConfirmDialog
        [Model/id]
            AttachmentCard/attachmentList
            .{&}
                AttachmentCard/attachment
        [Model/actions]
            AttachmentCard/onClickImage
            AttachmentCard/onClickUnlink
            AttachmentCard/onDeleteConfirmDialogClosed
`;

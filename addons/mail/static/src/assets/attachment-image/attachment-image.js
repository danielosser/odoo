/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Model}
        [Model/name]
            AttachmentImage
        [Model/fields]
            attachment
            attachmentList
            component
            hasDeleteConfirmDialog
            height
            imageUrl
            width
        [Model/id]
            AttachmentImage/attachmentList
            .{&}
                AttachmentImage/attachment
        [Model/actions]
            AttachmentImage/onClickImage
            AttachmentImage/onClickUnlink
            AttachmentImage/onDeleteConfirmDialogClosed
`;

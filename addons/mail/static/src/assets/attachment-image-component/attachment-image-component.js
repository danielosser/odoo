/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Model}
        [Model/name]
            AttachmentImageComponent
        [Model/fields]
            attachmentImage
        [Model/template]
            root
                image
                uploading
                    uploadingIcon
                imageOverlay
                    actions
                        actionUnlink
                            unlinkIcon
                attachmentDeleteConfirmDialog
`;

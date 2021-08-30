/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Model}
        [Model/name]
            AttachmentCardComponent
        [Model/fields]
            attachmentCard
        [Model/template]
            root
                image
                details
                    filename
                    extension
                aside
                    asideItemUploading
                        uploadingIcon
                    asideItemUploaded
                        uploadedIcon
                    asideItemUnlink
                        unlinkIcon
                    asideItemDownload
                        downloadIcon
                attachmentDeleteConfirmDialog
`;

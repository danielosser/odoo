/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Model}
        [Model/name]
            AttachmentViewer
        [Model/fields]
            angle
            attachment
            attachmentList
            attachments
            dialog
            imageUrl
            isImageLoading
            scale
        [Model/id]
            AttachmentViewer/attachmentList
        [Model/actions]
            AttachmentViewer/close
`;

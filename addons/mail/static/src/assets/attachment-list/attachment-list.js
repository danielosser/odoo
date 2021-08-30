/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Model}
        [Model/name]
            AttachmentList
        [Model/fields]
            attachmentCards
            attachmentImages
            attachments
            attachmentViewer
            chatter
            composerView
            imageAttachments
            message
            messageView
            nonImageAttachments
            viewableAttachments
        [Model/id]
            AttachmentList/composerView
            .{|}
                AttachmentList/messageView
            .{|}
                AttachmentList/chatter
`;

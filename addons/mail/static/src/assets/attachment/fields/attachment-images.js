/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        States the attachment images that are displaying this attachment.
    {Field}
        [Field/name]
            attachmentImages
        [Field/model]
            Attachment
        [Field/type]
            o2m
        [Field/target]
            AttachmentImage
        [Field/inverse]
            AttachmentImage/attachment
        [Field/isCausal]
            true
`;

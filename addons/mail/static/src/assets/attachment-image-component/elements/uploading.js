/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            uploading
        [Element/model]
            AttachmentImageComponent
        [Element/isPresent]
            @record
            .{AttachmentImageComponent/attachmentImage}
            .{AttachmentImage/attachment}
            .{Attachment/isUploading}
        [web.Element/class]
            d-flex
            align-items-center
            justify-content-center
            position-absolute
        [web.Element/title]
            {Locale/text}
                Uploading
        [web.Element/style]
            [web.scss/bottom]
                0
            [web.scss/left]
                0
            [web.scss/right]
                0
            [web.scss/top]
                0
`;

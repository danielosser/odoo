/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            asideItemUploading
        [Element/model]
            AttachmentCardComponent
        [Model/traits]
            AttachmentCardComponent/asideItem
        [Element/isPresent]
            @record
            .{AttachmentCardComponent/attachmentCard}
            .{AttachmentCard/attachment}
            .{Attachment/isUploading}
            .{&}
                @record
                .{AttachmentCardComponent/attachmentCard}
                .{AttachmentCard/attachmentList}
                .{AttachmentList/composerView}
        [web.Element/title]
            {Locale/text}
                Uploading
`;

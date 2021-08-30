/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            asideItemUploaded
        [Element/model]
            AttachmentCardComponent
        [Model/traits]
            AttachmentCardComponent/asideItem
        [Element/isPresent]
            @record
            .{AttachmentCardComponent/attachmentCard}
            .{AttachmentCard/attachment}
            .{Attachment/isUploading}
            .{isFalsy}
            .{&}
                @record
                .{AttachmentCardComponent/attachmentCard}
                .{AttachmentCard/attachmentList}
                .{AttachmentList/composerView}
        [web.Element/title]
            {Locale/text}
                Uploaded
        [web.Element/style]
            [web.scss/color]
                {scss/$o-brand-primary}
`;

/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            asideItemDownload
        [Element/model]
            AttachmentCardComponent
        [Model/traits]
            AttachmentCardComponent/asideItem
        [Element/isPresent]
            @record
            .{AttachmentCardComponent/attachmentCard}
            .{AttachmentCard/attachmentList}
            .{AttachmentList/composerView}
            .{isFalsy}
            .{&}
                @record
                .{AttachmentCardComponent/attachmentCard}
                .{AttachmentCard/attachment}
                .{Attachment/isUploading}
                .{isFalsy}
        [web.Element/title]
            {Locale/text}
                Download
        [Element/onClick]
            {Attachment/onClickDownload}
                [0]
                    @record
                    .{AttachmentCardComponent/attachmentCard}
                    .{AttachmentCard/attachment}
                [1]
                    @ev
        [web.Element/style]
            [web.scss/cursor]
                pointer
            {if}
                @field
                .{web.Element/isHover}
            .{then}
                [web.scss/background-color]
                    {scss/gray}
                        400
`;

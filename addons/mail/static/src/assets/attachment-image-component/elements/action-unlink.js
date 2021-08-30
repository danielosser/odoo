/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            actionUnlink
        [Element/model]
            AttachmentImageComponent
        [Model/traits]
            AttachmentImageComponent/action
        [web.Element/class]
            text-center
        [web.Element/title]
            {Locale/text}
                Remove
        [Element/isPresent]
            @record
            .{AttachmentImageComponent/attachmentImage}
            .{AttachmentImage/attachment}
            .{Attachment/isEditable}
        [Element/onClick]
            {AttachmentImage/onClickUnlink}
                [0]
                    @record
                    .{AttachmentImageComponent/attachmentImage}
                [1]
                    @ev
`;

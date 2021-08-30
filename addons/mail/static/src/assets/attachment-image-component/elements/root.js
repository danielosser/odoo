/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            root
        [Element/model]
            AttachmentImageComponent
        [web.Element/class]
            d-flex
            position-relative
        [Element/onClick]
            {AttachmentImage/onClickImage}
                [0]
                    @record
                    .{AttachmentImageComponent/attachmentImage}
                [1]
                    @ev
        [web.Element/data-mimetype]
            @record
            .{AttachmentImageComponent/attachmentImage}
            .{AttachmentImage/attachment}
            .{Attachment/mimetype}
        [web.Element/style]
            [web.scss/min-width]
                20
                px
            [web.scss/min-height]
                20
                px
            [web.scss/flex-shrink]
                0
            [web.scss/margin]
                {scss/map-get}
                    {scss/$spacers}
                    1
            [web.scss/cursor]
                zoom-in
`;

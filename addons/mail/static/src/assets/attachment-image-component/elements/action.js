/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            action
        [Element/model]
            AttachmentImageComponentß
        [web.Element/style]
            [web.scss/min-width]
                20
                px
            [web.scss/border-radius]
                10
                px
            [web.scss/cursor]
                pointer
            {if}
                @field
                .{web.Element/isHover}
            .{then}
                [web.scss/background]
                    {scss/rgba}
                        0
                        0
                        0
                        0.2
`;

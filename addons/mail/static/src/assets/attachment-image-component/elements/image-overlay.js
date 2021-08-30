/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            imageOverlay
        [Element/model]
            AttachmentImageComponent
        [web.Element/class]
            d-flex
            flex-row
            justify-content-end
            position-absolute
        [web.Element/style]
            {if}
                @record
                .{web.Element/isHover}
            .{then}
                [web.scss/opacity]
                    1
            [web.scss/bottom]
                0
            [web.scss/left]
                0
            [web.scss/padding]
                {scss/map-get}
                    {scss/$spacers}
                    2
            [web.scss/right]
                0
            [web.scss/top]
                0
            [web.scss/color]
                {scss/$white}
            [web.scss/opacity]
                0
            [web.scss/transition]
                all
                0.3s
                ease
                0s
`;

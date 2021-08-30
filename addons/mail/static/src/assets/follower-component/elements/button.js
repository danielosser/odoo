/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            button
        [Element/model]
            FollowerComponent
        [Model/traits]
            Hoverable
        [web.Element/style]
            [web.scss/border-radius]
                0
            {if}
                @field
                .{web.Element/isHover}
            .{then}
                [web.scss/background]
                    {scss/gray}
                        400
                [web.scss/color]
                    {scss/$black}
`;

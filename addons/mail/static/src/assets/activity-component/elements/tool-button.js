/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            toolButton
        [Element/model]
            ActivityComponent
        [Model/traits]
            Hoverable
        [web.Element/style]
            [web.scss/padding-top]
                {scss/map-get}
                    {scss/$spacers}
                    0
            [web.scss/opacity]
                0.5
            [web.scss/color]
                {scss/gray}
                    500
            {if}
                @field
                .{web.Element/isHover}
            .{then}
                [web.scss/opacity]
                    1
                [web.scss/color]
                    {scss/gray}
                        600
`;

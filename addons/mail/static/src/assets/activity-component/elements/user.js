/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            user
        [Element/model]
            ActivityComponent
        [web.Element/style]
            [web.scss/height]
                36
                px
            [web.scss/margin-left]
                {scss/map-get}
                    {scss/$spacers}
                    2
            [web.scss/margin-right]
                {scss/map-get}
                    {scss/$spacers}
                    2
            [web.scss/position]
                relative
            [web.scss/width]
                36
                px
`;

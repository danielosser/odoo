/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            sidebar
        [Element/model]
            ActivityComponent
        [web.Element/style]
            [web.scss/display]
                flex
            [web.scss/flex]
                [0]
                    0
                [1]
                    0
                [2]
                    36
                    px
            [web.scss/margin-right]
                {scss/map-get}
                    {scss/$spacers}
                    3
            [web.scss/justify-content]
                center
            [web.scss/font-size]
                smaller
`;

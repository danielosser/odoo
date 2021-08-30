/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            root
        [Element/model]
            DialogComponent]
        [web.Element/style]
            [web.scss/position]
                absolute
            [web.scss/top]
                0
            [web.scss/bottom]
                0
            [web.scss/left]
                0
            [web.scss/right]
                0
            [web.scss/display]
                flex
            [web.scss/align-items]
                center
            [web.scss/justify-content]
                center
            [web.scss/z-index]
                {scss/$zindex-modal}
            [web.scss/background-color]
                {web.scss/rgba}
                    {scss/$black}
                    0.7
`;

/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            titleBadge
        [Element/model]
            ActivityBoxComponent
        [web.Element/tag]
            span
        [web.Element/class]
            badge
            rounded-circle
        [web.Element/style]
            [web.scss/padding]
                [0]
                    {scss/map-get}
                        {scss/$spacers}
                        0
                [1]
                    {scss/map-get}
                        {scss/$spacers}
                        2
            [web.scss/font-size]
                11
                px
`;

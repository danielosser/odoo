/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            titleText
        [Element/model]
            ActivityBoxComponent
        [web.Element/tag]
            span
        [web.Element/style]
            [web.scss/margin]
                [0]
                    {scss/map-get}
                        {scss/$spacers}
                        0
                [1]
                    {scss/map-get}
                        {scss/$spacers}
                        3
`;

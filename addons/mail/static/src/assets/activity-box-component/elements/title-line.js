/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            titleLine
        [Element/model]
            ActivityBoxComponent
        [web.Element/tag]
            hr
        [web.Element/style]
            [web.scss/flex]
                1
                1
                auto
            [web.scss/width]
                auto
            [web.scss/border-color]
                {scss/gray}
                    400
            [web.scss/border-style]
                dashed
`;

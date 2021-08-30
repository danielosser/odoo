/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            separator
        [Element/model]
            RtcLayoutMenuComponent
        [web.Element/tag]
            hr
        [Model/style]
            [web.scss/width]
                100%
            [web.scss/background-color]
                {scss/$border-color}
`;

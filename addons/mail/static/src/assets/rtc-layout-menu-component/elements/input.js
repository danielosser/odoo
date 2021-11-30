/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            input
        [Element/model]
            RtcLayoutMenuComponent
        [web.Element/tag]
            input
        [web.Element/type]
            radio
        [web.Element/style]
            [web.scss/margin]
                {scss/map-get}
                    {scss/$spacers}
                    3
`;

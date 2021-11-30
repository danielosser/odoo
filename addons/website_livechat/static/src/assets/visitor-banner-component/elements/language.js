/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            language
        [Element/model]
            VisitorBannerComponent
        [web.Element/tag]
            span
        [web.Element/style]
            [web.scss/margin-inline-end]
                {scss/map-get}
                    {scss/$spacers}
                    3
`;

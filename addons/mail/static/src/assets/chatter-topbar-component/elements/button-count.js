/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            buttonCount
        [Element/model]
            ChatterTopbarComponent
        [web.Element/style]
            [web.scss/padding-left]
                {scss/map-get}
                    {scss/$spacers}
                    1
`;

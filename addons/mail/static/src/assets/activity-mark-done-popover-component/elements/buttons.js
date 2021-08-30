/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            buttons
        [Element/model]
            ActivityMarkDonePopoverComponent
        [web.Element/style]
            [web.scss/margin-top]
                {scss/map-get}
                    {scss/$spacers}
                    2
`;

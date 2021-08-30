/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            trackingValue
        [Element/model]
            MessageViewComponent
        [web.Element/style]
            [web.scss/display]
                flex
            [web.scss/align-items]
                center
            [web.scss/flex-wrap]
                wrap
`;

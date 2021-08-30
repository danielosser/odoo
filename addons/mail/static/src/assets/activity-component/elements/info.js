/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            info
        [Element/model]
            ActivityComponent
        [web.Element/style]
            [web.scss/display]
                flex
            [web.scss/align-items]
                baseline
`;

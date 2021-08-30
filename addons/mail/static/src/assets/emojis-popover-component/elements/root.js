/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            root
        [Element/model]
            EmojisPopoverComponent
        [web.Element/style]
            [web.scss/display]
                flex
            [web.scss/flex-flow]
                row wrap
            [web.scss/max-width]
                200
                px
`;

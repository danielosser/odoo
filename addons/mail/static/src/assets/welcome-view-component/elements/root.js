/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            root
        [Element/model]
            WelcomeViewComponent
        [web.Element/class]
            h-100
            d-flex
            flex-column
            justify-content-center
            align-items-center
            bg-light
`;

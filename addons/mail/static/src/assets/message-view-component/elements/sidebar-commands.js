/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            sidebarCommands
        [Element/model]
            MessageViewComponent
        [web.Element/style]
            [web.scss/display]
                none
`;

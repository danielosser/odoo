/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            sidebarMain
        [Element/model]
            ComposerViewComponent
        [Element/isPresent]
            @record
            .{ComposerViewComponent/hasCurrentPartnerAvatar}
        [web.Element/style]
            [web.scss/grid-area]
                sidebar-main
            [web.scss/justify-self]
                center
`;

/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            tabLabel
        [Element/model]
            MobileMessagingNavbarComponent
        [web.Element/tag]
            span
        [web.Element/textContent]
            @template
            .{Template/tab}
            .{Tab/label}
        [web.Element/style]
            [web.scss/font-size]
                0.8
                em
`;

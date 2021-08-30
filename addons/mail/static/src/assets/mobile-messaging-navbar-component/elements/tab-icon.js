/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            tabIcon
        [Element/model]
            MobileMessagingNavbarComponent
        [web.Element/tag]
            span
        [Element/isPresent]
            @template
            .{Template/tab}
            .{Tab/icon}
        [web.Element/class]
            @template
            .{Template/tab}
            .{Tab/icon}
        [web.Element/style]
            [web.scss/margin-bottom]
                4%
            [web.scss/font-size]
                1.3
                em
`;

/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            topbar
        [Element/model]
            ChatterComponent
        [Field/target]
            ChatterTopbarComponent
        [Element/props]
            [ChatterTopbarComponent/chatter]
                @record
                .{ChatterComponent/chatter}
`;

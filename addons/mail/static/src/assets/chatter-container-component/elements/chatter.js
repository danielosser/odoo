/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            chatter
        [Element/model]
            ChatterContainerComponent
        [Field/target]
            ChatterComponent
        [Element/props]
            [ChatterComponent/chatter]
                @record
                .{ChatterContainerComponent/chatter}
`;

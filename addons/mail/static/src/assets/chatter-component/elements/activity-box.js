/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            activityBox
        [Element/model]
            ChatterComponent
        [Field/target]
            ActivityBoxComponent
        [Element/isPresent]
            @record
            .{ChatterComponent/chatter}
            .{Chatter/activityBoxView}
        [Element/props]
            [ActivityBoxComponent/activityBoxView]
                @record
                .{ChatterComponent/chatter}
                .{Chatter/activityBoxView}
`;

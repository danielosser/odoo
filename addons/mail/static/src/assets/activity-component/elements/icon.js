/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            icon
        [Element/model]
            ActivityComponent
        [web.Element/tag]
            i
        [web.Element/class]
            fa
            @record
            .{ActivityComponent/activity}
            .{Activity/icon}
`;

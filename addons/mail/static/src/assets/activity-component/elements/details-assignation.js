/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            detailsAssignation
        [Element/model]
            ActivityComponent
        [web.Element/tag]
            dd
        [web.Element/isPresent]
            @record
            .{ActivityComponent/activity}
            .{Activity/assignee}
`;

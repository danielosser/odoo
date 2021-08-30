/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            detailsAssignationUserName
        [Element/model]
            ActivityComponent
        [web.Element/tag]
            span
        [web.Element/textContent]
            @record
            .{ActivityComponent/activity}
            .{Activity/assignee}
            .{User/nameOrDisplayName}
`;

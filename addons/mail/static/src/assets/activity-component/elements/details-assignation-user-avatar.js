/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            detailsAssignationUserAvatar
        [Element/model]
            ActivityComponent
        [web.Element/tag]
            img
        [Model/traits]
            ActivityComponent/detailsUserAvatar
        [web.Element/src]
            /web/image/res.users/
            .{+}
                @record
                .{ActivityComponent/activity}
                .{Activity/assignee}
                .{User/id}
            .{+}
                /avatar_128
        [web.Element/title]
            @record
            .{ActivityComponent/activity}
            .{Activity/assignee}
            .{User/nameOrDisplayName}
        [web.Element/alt]
            @record
            .{ActivityComponent/activity}
            .{Activity/assignee}
            .{User/nameOrDisplayName}
`;

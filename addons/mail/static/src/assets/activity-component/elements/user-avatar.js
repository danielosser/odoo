/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            userAvatar
        [Element/model]
            ActivityComponent
        [web.Element/tag]
            img
        [Element/isPresent]
            @record
            .{ActivityComponent/activity}
            .{Activity/assignee}
        [web.Element/src]
            /web/image/res.users/
            .{+}
                @record
                .{ActivityComponent/activity}
                .{Activity/assignee}
                .{User/id}
            .{+}
                /avatar_128
        [web.Element/alt]
            @record
            .{ActivityComponent/activity}
            .{Activity/assignee}
            .{User/nameOrDisplayName}
        [web.Element/style]
            [web.scss/height]
                {scss/map-get}
                    {scss/$sizes}
                    100
            [web.scss/width]
                {scss/map-get}
                    {scss/$sizes}
                    100
            {scss/extend}
                .rounded-circle
`;

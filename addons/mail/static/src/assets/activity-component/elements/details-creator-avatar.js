/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            detailsCreatorAvatar
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
                .{Activity/creator}
                .{User/id}
            .{+}
                /avatar_128
        [web.Element/title]
            @record
            .{ActivityComponent/activity}
            .{Activity/creator}
            .{User/nameOrDisplayName}
        [web.Element/alt]
            @record
            .{ActivityComponent/activity}
            .{Activity/creator}
            .{User/nameOrDisplayName}
        [web.Element/style]
            [web.scss/margin-inline-start]
                {scss/map-get}
                    {scss/$spacers}
                    2
`;

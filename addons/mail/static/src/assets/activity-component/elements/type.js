/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            type
        [Element/model]
            ActivityComponent
        [Element/isPresent]
            @record
            .{ActivityComponent/activity}
            .{Activity/summary}
            .{isFalsy}
            .{&}
                @record
                .{ActivityComponent/activity}
                .{Activity/type}
        [web.Element/textContent]
            @record
            .{ActivityComponent/activity}
            .{Activity/type}
            .{ActivityType/displayName}
        [web.Element/style]
            [web.scss/margin-inline-end]
                {scss/map-get}
                    {scss/$spacers}
                    2
            [web.scss/font-weight]
                bolder
            [web.scss/color]
                {scss/gray}
                    900
`;

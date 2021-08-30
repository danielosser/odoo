/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            userName
        [Element/model]
            ActivityComponent
        [Element/isPresent]
            @record
            .{ActivityComponent/activity}
            .{Activity/assignee}
        [web.Element/textContent]
            {String/sprintf}
                [0]
                    {Locale/text}
                        for %s
                [1]
                    @record
                    .{ActivityComponent/activity}
                    .{Activity/assignee}
                    .{User/nameOrDisplayName}
        [web.Element/style]
                [web.scs/color]
                    {scss/gray}
                        500
`;

/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            topbar
        [Element/model]
            ThreadViewComponent
        [Field/target]
            ThreadViewTopbarComponent
        [web.Element/class]
            border-bottom
        [Element/props]
            [ThreadViewTopbarComponent/threadViewTopbar]
                @record
                .{ThreadViewComponent/threadView}
                .{ThreadView/topbar}
        [Element/isPresent]
            @record
            .{ThreadViewComponent/threadView}
            .{ThreadView/topbar}
`;

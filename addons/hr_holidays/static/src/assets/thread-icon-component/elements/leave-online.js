/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            leaveOnline
        [Element/feature]
            hr_holidays
        [Element/model]
            ThreadIconComponent
        [Model/traits]
            ThreadIconComponent/online
        [Element/isPresent]
            @record
            .{ThreadIconComponent/thread}
            .{Thread/correspondent}
            .{Partner/imStatus}
            .{=}
                leave_online
        [web.Element/title]
            {Locale/text}
                Online
`;

/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            leaveOffline
        [Element/feature]
            hr_holidays
        [Element/model]
            ThreadIconComponent
        [Model/traits]
            ThreadIconComponent/offline
        [web.Element/class]
            fa
            fa-plane
        [Element/isPresent]
            @record
            .{ThreadIconComponent/thread}
            .{Thread/correspondent}
            .{Partner/imStatus}
            .{=}
                leave_offline
        [web.Element/title]
            {Locale/text}
                Out of office
`;

/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            leaveAway
        [Element/feature]
            hr_holidays
        [Element/model]
            ThreadIconComponent
        [Model/traits]
            ThreadIconComponent/away
        [web.Element/class]
            fa
            fa-plane
        [Element/isPresent]
            @record
            .{ThreadIconComponent/thread}
            .{Thread/correspondent}
            .{Partner/imStatus}
            .{=}
                leave_away
        [web.Element/title]
            {Locale/text}
                Away
`;

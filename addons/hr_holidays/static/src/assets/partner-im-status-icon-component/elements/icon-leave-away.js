/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    Element
        [Element/name]
            iconLeaveAway
        [Element/model]
            PartnerImStatusIconComponent
        [Element/feature]
            hr_holidays
        [Model/traits]
            PartnerImStatusIconComponent/icon
        [web.Element/class]
            fa
            fa-plane
            fa-stack-1x
        [Element/isPresent]
            @record
            .{PartnerImStatusIconComponent/partner}
            .{Partner/imStatus}
            .{=}
                leave_away
        [web.Element/title]
            {Locale/text}
                Away
        [web.Element/role]
            img
        [web.Element/aria-label]
            {Locale/text}
                User is away
`;

/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            iconLeaveOffline
        [Element/feature]
            hr_holidays
        [Element/model]
            PartnerImStatusIconComponent
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
                leave_offline
        [web.Element/title]
            {Locale/text}
                Out of office
        [web.Element/role]
            img
        [web.Element/aria-label]
            {Locale/text}
                User is out of office
`;

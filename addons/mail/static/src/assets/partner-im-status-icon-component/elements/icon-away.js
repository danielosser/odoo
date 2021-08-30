/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            iconAway
        [Element/model]
            PartnerImStatusIconComponent
        [Model/traits]
            PartnerImStatusIconComponent/icon
        [web.Element/class]
            fa
            fa-circle
            fa-stack-1x
        [Element/isPresent]
            @record
            .{PartnerImStatusIconComponent/partner}
            .{Partner/imStatus}
            .{=}
                away
        [web.Element/title]
            {Locale/text}
                Idle
        [web.Element/role]
            img
        [web.Element/aria-label]
            {Locale/text}
                User is idle
`;

/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            iconBot
        [Element/model]
            PartnerImStatusIconComponent
        [Model/traits]
            PartnerImStatusIconComponent/icon
        [web.Element/class]
            fa
            fa-heart
            fa-stack-1x
        [Element/isPresent]
            @record
            .{PartnerImStatusIconComponent/partner}
            .{=}
                {Env/partnerRoot}
        [web.Element/title]
            {Locale/text}
                Bot
        [web.Element/role]
            img
        [web.Element/aria-label]
            {Locale/text}
                User is a bot
`;

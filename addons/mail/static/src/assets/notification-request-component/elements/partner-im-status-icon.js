/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            partnerImStatusIcon
        [Element/model]
            NotificationRequestComponent
        [Field/target]
            PartnerImStatusIconComponent
        [Model/traits]
            NotificationListItemComponent/partnerImStatusIcon
        [Element/props]
            [PartnerImStatusIconComponent/partner]
                {Env/partnerRoot}
`;

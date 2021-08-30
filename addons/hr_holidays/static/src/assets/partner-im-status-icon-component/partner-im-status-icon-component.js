/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {ModelAddon}
        [ModelAddon/feature]
            hr_holidays
        [ModelAddon/model]
            PartnerImStatusIconComponent
        [ModelAddon/template]
            root
                iconLeaveOnline
                iconLeaveAway
                iconLeaveOffline
`;

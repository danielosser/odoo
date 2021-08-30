/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {ModelAddon}
        [ModelAddon/feature]
            hr_holidays
        [ModelAddon/model]
            ThreadIconComponent
        [ModelAddon/template]
            root
                leaveOnline
                leaveAway
                leaveOffline
`;

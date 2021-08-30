/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {ModelAddon}
        [ModelAddon/feature]
            hr_holidays
        [ModelAddon/model]
            ThreadViewComponent
        [ModelAddon/template]
            root
                outOfOffice
`;

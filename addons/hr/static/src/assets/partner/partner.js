/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {ModelAddon}
        [ModelAddon/feature]
            hr
        [ModelAddon/model]
            Partner
        [ModelAddon/fields]
            employee
            hasCheckedEmployee
        [ModelAddon/actions]
            Partner/checkIsEmployee
        [ModelAddon/actionAddons]
            Partner/openProfile
`;

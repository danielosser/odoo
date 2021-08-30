/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {ModelAddon}
        [ModelAddon/feature]
            sms
        [ModelAddon/model]
            NotificationGroupComponent
        [ModelAddon/elementAddons]
            inlineText
        [ModelAddon/actionAddons]
            NotificationGroupComponent/getImage
`;

/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {ModelAddon}
        [ModelAddon/feature]
            snailmail
        [ModelAddon/model]
            NotificationGroupComponent
        [ModelAddon/elementAddons]
            inlineText
        [ModelAddon/actionAddons]
            NotificationGroupComponent/getImage
`;

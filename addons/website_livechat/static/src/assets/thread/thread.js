/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {ModelAddon}
        [ModelAddon/feature]
            website_livechat
        [ModelAddon/model]
            Thread
        [ModelAddon/fields]
            visitor
        [ModelAddon/actionAddons]
            Thread/convertData
`;

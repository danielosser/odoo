/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {ModelAddon}
        [ModelAddon/feature]
            hr
        [ModelAddon/model]
            Env
        [ModelAddon/actionAddons]
            Env/getChat
            Env/openProfile
`;

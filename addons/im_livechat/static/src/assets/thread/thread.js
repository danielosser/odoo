/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {ModelAddon}
        [ModelAddon/feature]
            im_livechat
        [ModelAddon/model]
            Thread
        [ModelAddon/fieldAddons]
            correspondent
            displayName
            hasInviteFeature
            hasMemberListFeature
            isChatChannel
        [ModelAddon/actionAddons]
            Thread/convertData
`;

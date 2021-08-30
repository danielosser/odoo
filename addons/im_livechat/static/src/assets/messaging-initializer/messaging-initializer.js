/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {ModelAddon}
        [ModelAddon/feature]
            im_livechat
        [ModelAddon/model]
            MessagingInitializer
        [ModelAddon/actionAddons]
            MessagingInitializer/_initCommands
            MessagingInitializer/_initResUsersSettings
`;

/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {ModelAddon}
        [ModelAddon/feature]
            im_livechat
        [ModelAddon/model]
            MessagingNotificationHandler
        [ModelAddon/actionAddons]
            MessagingNotificationHandler/_handleNotificationChannelTypingStatus
            MessagingNotificationHandler/_handleNotificationResUsersSettings
`;

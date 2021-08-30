/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {ModelAddon}
        [ModelAddon/model]
            NotificationListComponent
        [ModelAddon/feature]
            im_livechat
        [ModelAddon/fieldAddons]
            filter
        [ModelAddon/actionAddons]
            NotificationListComponent/_getThreads
`;

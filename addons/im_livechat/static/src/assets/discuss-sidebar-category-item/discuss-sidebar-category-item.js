/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {ModelAddon}
        [ModelAddon/feature]
            im_livechat
        [ModelAddon/model]
            DiscussSidebarCategoryItem
        [ModelAddon/fieldAddons]
            avatarUrl
            counter
            hasUnpinCommand
            hasThreadIcon
`;

/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {ModelAddon}
        [ModelAddon/feature]
            im_livechat
        [ModelAddon/model]
            DiscussSidebarCategory
        [ModelAddon/fields]
            categoryLivechat
        [ModelAddon/id]
            @original
            .{|}
                DiscussSidebarCategory/discussAsLivechat
`;

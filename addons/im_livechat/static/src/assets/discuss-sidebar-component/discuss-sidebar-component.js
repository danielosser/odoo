/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {ModelAddon}
        [ModelAddon/feature]
            im_livechat
        [ModelAddon/model]
            DiscussSidebarComponent
        [ModelAddon/template]
            root
                categoryLivechat
`;

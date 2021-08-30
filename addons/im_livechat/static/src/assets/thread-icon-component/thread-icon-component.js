/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {ModelAddon}
        [ModelAddon/feature]
            im_livechat
        [ModelAddon/model]
            ThreadIconComponent
        [ModelAddon/template]
            root
                typingLivechat
                iconLivechat
`;

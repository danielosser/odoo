/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {ModelAddon}
        [ModelAddon/feature]
            im_livechat
        [ModelAddon/model]
            ThreadNeedactionPreviewComponent
        [ModelAddon/actionAddons]
            ThreadNeedactionPreviewComponent/getImage
`;

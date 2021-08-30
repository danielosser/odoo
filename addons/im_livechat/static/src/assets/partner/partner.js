/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {ModelAddon}
        [ModelAddon/feature]
            im_livechat
        [ModelAddon/model]
            Partner
        [ModelAddon/actions]
            Partner/getNextPublicId
`;

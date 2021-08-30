/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {FieldAddon}
        [FieldAddon/field]
            NotificationListComponent/filter
        [FieldAddon/feature]
            im_livechat
        [FieldAddon/validate]
            @original
            .{|}
                @field
                .{=}
                    livechat
`;

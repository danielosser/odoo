/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {FieldAddon}
        [FieldAddon/field]
            hasInviteFeature
        [FieldAddon/model]
            Thread
        [FieldAddon/feature]
            im_livechat
        [FieldAddon/compute]
            {if}
                @record
                .{Thread/channelType}
                .{=}
                    livechat
            .{then}
                true
            .{else}
                @original
`;

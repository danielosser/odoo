/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {FieldAddon}
        [FieldAddon/field]
            Thread/correspondent
        [FieldAddon/feature]
            im_livechat
        [FieldAddon/compute]
            {if}
                @record
                .{Thread/channelType}
                .{=}
                    livechat
            .{then}
                {Dev/comment}
                    livechat correspondent never change:
                    always the public member.
                {break}
            @original
`;

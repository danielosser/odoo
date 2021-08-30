/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {ActionAddon}
        [ActionAddon/action]
            ThreadPreviewComponent/getImage
        [ActionAddon/feature]
            im_livechat
        [ActionAddon/params]
            record
        [ActionAddon/behavior]
            {if}
                @record
                .{ThreadPreviewComponent/thread}
                .{Thread/channelType}
                .{=}
                    livechat
            .{then}
                /mail/static/src/img/smiley/avatar.jpg
            .{else}
                @original
`;

/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {ActionAddon}
        [ActionAddon/action]
            NotificationGroupComponent/getImage
        [ActionAddon/feature]
            snailmail
        [ActionAddon/params]
            record
        [ActionAddon/behavior]
            {if}
                @record
                .{NotificationGroupComponent/notificationGroup}
                .{NotificationGroup/type}
                .{=}
                    snail
            .{then}
                /snailmail/static/img/snailmail_failure.png
            .{else}
                @original
`;

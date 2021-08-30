/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {ActionAddon}
        [ActionAddon/action]
            NotificationGroupComponent/getImage
        [ActionAddon/feature]
            sms
        [ActionAddon/params]
            record
        [ActionAddon/behavior]
            {if}
                @record
                .{NotificationGroupComponent/group}
                .{NotificationGroup/type}
                .{=}
                    sms
            .{then}
                /sms/static/img/sms_failure.svg
            .{else}
                @original
`;

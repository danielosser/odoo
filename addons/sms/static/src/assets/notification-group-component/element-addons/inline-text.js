/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {ElementAddon}
        [ElementAddon/element]
            NotificationGroupComponent/inlineText
        [ElementAddon/feature]
            sms
        [ElementAddon/textContent]
            {if}
                @record
                .{NotificationGroupComponent/notificationGroup}
                .{NotificationGroup/type}
                .{=}
                    sms
            .{then}
                {Locale/text}
                    An error occurred when sending an SMS.
            .{else}
                @original
`;

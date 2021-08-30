/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {ElementAddon}
        [ElementAddon/element]
            NotificationGroupComponent/inlineText
        [ElementAddon/feature]
            snailmail
        [ElementAddon/textContent]
            {if}
                @record
                .{NotificationGroupComponent/notificationGroup}
                .{NotificationGroup/type}
                .{=}
                    snail
            .{then}
                {Locale/text}
                    An error occurred when sending a letter with Snailmail.
            .{else}
                @original
`;

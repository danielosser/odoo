/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            pttRegisteringText
        [Element/model]
            RtcConfigurationMenuComponent
        [Element/isPresent]
            {Env/userSetting}
            .{UserSetting/usePushToTalk}
            .{&}
                {Env/userSetting}
                .{UserSetting/rtcConfigurationMenu}
                .{RtcConfigurationMenu/isRegisteringKey}
        [web.Element/textContent]
            {Locale/text}
                Press a key to register it as the push-to-talk shortcut
`;

/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            pttDelayValue
        [Element/model]
            RtcConfigurationMenuComponent
        [Model/traits]
            RtcConfigurationMenuComponent/inputGroupValue
        [web.Element/textContent]
            {String/sprintf}
                [0]
                    {Locale/text}
                        %(s)ms
                [1]
                    {Env/userSetting}
                    .{UserSetting/voiceActiveDuration}
`;

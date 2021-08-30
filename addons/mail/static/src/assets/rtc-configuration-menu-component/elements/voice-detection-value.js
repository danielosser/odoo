/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            voiceDetectionValue
        [Element/model]
            RtcConfigurationMenuComponent
        [Model/traits]
            RtcConfigurationMenuComponent/inputGroupValue
        [web.Element/textContent]
            {Env/userSetting}
            .{UserSetting/voiceActivationThreshold}
`;

/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            voiceDetection
        [Element/model]
            RtcConfigurationMenuComponent
        [Element/isPresent]
            {Env/userSetting}
            .{UserSetting/usePushToTalk}
            .{isFalsy}
        [Model/traits]
            RtcConfigurationMenuComponent/option
`;

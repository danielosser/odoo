/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            pttDelay
        [Element/model]
            RtcConfigurationMenuComponent
        [Element/isPresent]
            {Env/userSetting}
            .{UserSetting/usePushToTalk}
        [Model/traits]
            RtcConfigurationMenuComponent/option
`;

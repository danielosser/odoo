/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            pttKey
        [Element/model]
            RtcConfigurationMenuComponent
        [Model/traits]
            RtcConfigurationMenuComponent/option
        [Element/isPresent]
            {Env/userSetting}
            .{UserSetting/usePushToTalk}
`;

/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            userSetting
        [Field/model]
            RtcConfigurationMenu
        [Field/type]
            o2o
        [Field/target]
            UserSetting
        [Field/isReadonly]
            true
        [Field/isRequired]
            true
        [Field/inverse]
            UserSetting/rtcConfigurationMenu
`;

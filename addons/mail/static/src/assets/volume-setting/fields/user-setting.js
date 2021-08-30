/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            userSetting
        [Field/model]
            VolumeSetting
        [Field/type]
            m2o
        [Field/target]
            UserSetting
        [Field/inverse]
            UserSetting/volumeSettings
        [Field/isRequired]
            true
`;

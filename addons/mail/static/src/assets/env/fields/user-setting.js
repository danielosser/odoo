/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            userSetting
        [Field/model]
            Env
        [Field/type]
            o2o
        [Field/target]
            UserSetting
        [Field/isCausal]
            true
`;

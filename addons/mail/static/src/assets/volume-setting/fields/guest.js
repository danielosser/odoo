/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            guest
        [Field/model]
            VolumeSetting
        [Field/type]
            o2o
        [Field/target]
            Guest
        [Field/inverse]
            Guest/volumeSetting
`;

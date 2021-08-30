/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            volumeSetting
        [Field/model]
            Partner
        [Field/type]
            o2o
        [Field/target]
            VolumeSetting
        [Field/inverse]
            VolumeSetting/partner
`;
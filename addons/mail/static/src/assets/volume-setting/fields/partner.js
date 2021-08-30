/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            partner
        [Field/model]
            VolumeSetting
        [Field/type]
            o2o
        [Field/target]
            Partner
        [Field/inverse]
            Partner/volumeSetting
`;

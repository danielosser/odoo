/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            partner
        [Field/model]
            PartnerImStatusIconComponent
        [Field/type]
            m2o
        [Field/target]
            Partner
        [Field/isRequired]
            true
`;

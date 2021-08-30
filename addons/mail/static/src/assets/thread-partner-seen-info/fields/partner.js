/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        Partner that this seen info is related to.
    {Field}
        [Field/name]
            partner
        [Field/model]
            ThreadPartnerSeenInfo
        [Field/type]
            m2o
        [Field/target]
            Partner
        [Field/isReadonly]
            true
        [Field/isRequired]
            true
        [Field/inverse]
            Partner/partnerSeenInfos
`;

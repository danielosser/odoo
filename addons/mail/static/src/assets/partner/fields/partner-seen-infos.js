/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            partnerSeenInfos
        [Field/model]
            Partner
        [Field/type]
            o2m
        [Field/target]
            ThreadPartnerSeenInfo
        [Field/inverse]
            ThreadPartnerSeenInfo/partner
        [Field/isCausal]
            true
`;

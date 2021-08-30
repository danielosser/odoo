/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        Thread (channel) that this seen info is related to.
    {Field}
        [Field/name]
            thread
        [Field/model]
            ThreadPartnerSeenInfo
        [Field/type]
            m2o
        [Field/target]
            Thread
        [Field/inverse]
            Thread/partnerSeenInfos
        [Field/isReadonly]
            true
        [Field/isRequired]
            true
`;

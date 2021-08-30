/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            lastSeenMessage
        [Field/model]
            ThreadPartnerSeenInfo
        [Field/type]
            m2o
        [Field/target]
            Message
`;

/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            partnerRoot
        [Field/model]
            Env
        [Field/type]
            m2o
        [Field/target]
            Partner
`;

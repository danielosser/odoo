/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            user
        [Field/model]
            Partner
        [Field/type]
            o2o
        [Field/target]
            User
        [Field/inverse]
            User/partner
`;

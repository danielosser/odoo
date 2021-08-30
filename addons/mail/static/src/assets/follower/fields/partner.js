/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            partner
        [Field/model]
            Follower
        [Field/type]
            m2o
        [Field/target]
            Partner
        [Field/isRequired]
            true
`;

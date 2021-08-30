/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            follower
        [Field/model]
            FollowerSubtypeList
        [Field/type]
            m2o
        [Field/target]
            Follower
        [Field/isReadonly]
            true
        [Field/isRequired]
            true
        [Field/inverse]
            Follower/subtypeList
`;

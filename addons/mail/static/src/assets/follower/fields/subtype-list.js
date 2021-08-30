/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            subtypeList
        [Field/model]
            Follower
        [Field/type]
            o2m
        [Field/target]
            FollowerSubtypeList
        [Field/isCausal]
            true
        [Field/inverse]
            FollowerSubtypeList/follower
`;

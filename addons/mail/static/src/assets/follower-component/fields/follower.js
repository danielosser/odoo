/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            follower
        [Field/model]
            FollowerComponent
        [Field/type]
            m2o
        [Field/target]
            Follower
        [Field/isRequired]
            true
`;

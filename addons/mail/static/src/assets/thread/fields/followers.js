/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            followers
        [Field/model]
            Thread
        [Field/type]
            o2m
        [Field/target]
            Follower
        [Field/inverse]
            Follower/followedThread
`;

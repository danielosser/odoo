/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            followedThread
        [Field/model]
            Follower]
        [Field/type]
            m2o
        [Field/target]
            Thread
        [Field/inverse]
            Thread/followers
`;

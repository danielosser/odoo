/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            followersPartner
        [Field/model]
            Thread
        [Field/type]
            m2m
        [Field/target]
            Partner
        [Field/related]
            Thread/followers
            Follower/partner
`;

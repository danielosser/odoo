/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            subtypes
        [Field/model]
            Follower
        [Field/type]
            m2m
        [Field/target]
            FollowerSubtype
`;

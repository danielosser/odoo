/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            selectedSubtypes
        [Field/model]
            Follower
        [Field/type]
            m2m
        [Field/target]
            FollowerSubtype
`;

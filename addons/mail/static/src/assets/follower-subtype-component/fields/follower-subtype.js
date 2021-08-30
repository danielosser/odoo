/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            followerSubtype
        [Field/model]
            FollowerSubtypeComponent
        [Field/type]
            m2o
        [Field/target]
            FollowerSubtype
        [Field/isRequired]
            true
`;

/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            record
        [Field/model]
            FollowerSubtypeListComponent
        [Field/type]
            m2o
        [Field/target]
            FollowerSubtypeList
        [Field/isRequired]
            true
`;

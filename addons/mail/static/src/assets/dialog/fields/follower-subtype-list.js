/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            followerSubtypeList
        [Field/model]
            Dialog
        [Field/type]
            o2o
        [Field/target]
            FollowerSubtypeList
        [Field/isCausal]
            true
        [Field/isReadonly]
            true
        [Field/inverse]
            FollowerSubtypeList/dialog
`;

/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        States the dialog displaying this follower subtype list.
    {Field}
        [Field/name]
            dialog
        [Field/model]
            FollowerSubtypeList
        [Field/type]
            o2o
        [Field/target]
            Dialog
        [Field/isCausal]
            true
        [Field/isReadonly]
            true
        [Field/inverse]
            Dialog/followerSubtypeList
`;

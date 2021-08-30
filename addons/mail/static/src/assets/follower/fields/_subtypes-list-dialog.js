/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            _subtypesListDialog
        [Field/model]
            Follower
        [Field/type]
            m2o
        [Field/target]
            FollowerSubtypeList
`;

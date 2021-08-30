/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Model}
        [Model/name]
            FollowerSubtypeList
        [Model/fields]
            dialog
            follower
        [Model/id]
            FollowerSubtypeList/follower
`;

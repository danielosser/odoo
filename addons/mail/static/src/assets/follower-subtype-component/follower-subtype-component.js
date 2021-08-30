/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Model}
        [Model/name]
            FollowerSubtypeComponent
        [Model/fields]
            follower
            followerSubtype
        [Model/template]
            root
                label
                    checkbox
                    text
`;

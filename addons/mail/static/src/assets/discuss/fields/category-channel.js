/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        Discuss sidebar category for 'channel' type channel threads.
    {Field}
        [Field/name]
            categoryChannel
        [Field/model]
            Discuss
        [Field/type]
            o2o
        [Field/target]
            DiscussSidebarCategory
        [Field/isCausal]
            true
        [Field/inverse]
            DiscussSidebarCategory/discussAsChannel
`;

/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        Discuss sidebar category for 'chat' type channel threads.
    {Field}
        [Field/name]
            categoryChat
        [Field/model]
            Discuss
        [Field/type]
            o2o
        [Field/target]
            DiscussSidebarCategory
        [Field/isCausal]
            true
        [Field/inverse]
            DiscussSidebarCategory/discussAsChat
`;

/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        Discuss sidebar category for 'livechat' channel threads.
    {Field}
        [Field/name]
            categoryLivechat
        [Field/model]
            Discuss
        [Field/feature]
            im_livechat
        [Field/type]
            o2o
        [Field/target]
            DiscussSidebarCategory
        [Field/inverse]
            DiscussSidebarCategory/discussAsLivechat
        [Field/isCausal]
            true
`;

/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        States the 'ThreadView' that are currently displaying 'this'.
    {Field}
        [Field/name]
            threadViews
        [Field/model]
            ThreadCache
        [Field/type]
            o2m
        [Field/target]
            ThreadView
        [Field/inverse]
            ThreadView/threadCache
`;

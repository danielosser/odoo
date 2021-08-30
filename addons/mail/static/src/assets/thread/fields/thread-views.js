/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            threadViews
        [Field/model]
            Thread
        [Field/type]
            o2m
        [Field/target]
            ThreadView
        [Field/inverse]
            ThreadView/thread
`;

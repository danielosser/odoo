/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        States the thread view managing this top bar.
    {Field}
        [Field/name]
            threadView
        [Field/model]
            ThreadViewTopbar
        [Field/type]
            o2o
        [Field/target]
            ThreadView
        [Field/inverse]
            ThreadView/topbar
        [Field/isReadonly]
            true
        [Field/isRequired]
            true
`;
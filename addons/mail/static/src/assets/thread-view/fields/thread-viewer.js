/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        Determines the 'ThreadViewer' currently managing 'this'.
    {Field}
        [Field/name]
            threadViewer
        [Field/model]
            ThreadView
        [Field/type]
            o2o
        [Field/target]
            ThreadView
        [Field/isReadonly]
            true
        [Field/isRequired]
            true
        [Field/inverse]
            ThreadView/threadView
`;

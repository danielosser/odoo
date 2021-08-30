/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        States the 'ThreadCache' currently displayed by 'this'.
    {Field}
        [Field/name]
            threadCache
        [Field/model]
            ThreadView
        [Field/type]
            m2o
        [Field/target]
            ThreadCache
        [Field/inverse]
            ThreadCache/threadViews
        [Field/related]
            ThreadView/threadViewer
            ThreadViewer/threadCache
`;

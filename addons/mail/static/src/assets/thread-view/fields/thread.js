/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        Determines the 'Thread' currently displayed by 'this'.
    {Field}
        [Field/name]
            thread
        [Field/model]
            ThreadView
        [Field/type]
            m2o
        [Field/target]
            Thread
        [Field/inverse]
            Thread/threadViews
        [Field/related]
            ThreadView/threadViewer
            ThreadViewer/thread
`;

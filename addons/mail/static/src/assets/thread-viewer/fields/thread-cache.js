/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        States the 'ThreadCache' that should be displayed by 'this'.
    {Field}
        [Field/name]
            threadCache
        [Field/model]
            ThreadViewer
        [Field/type]
            m2o
        [Field/target]
            ThreadCache
        [Field/related]
            ThreadViewer/thread
            Thread/cache
`;

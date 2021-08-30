/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        States the thread view on which this composer allows editing (if any).
    {Field}
        [Field/name]
            threadView
        [Field/model]
            ComposerView
        [Field/type]
            o2o
        [Field/target]
            ThreadView
        [Field/isReadonly]
            true
        [Field/inverse]
            ThreadView/composerView
`;

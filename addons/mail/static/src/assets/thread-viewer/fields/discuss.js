/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            discuss
        [Field/model]
            ThreadViewer
        [Field/type]
            o2o
        [Field/target]
            Discuss
        [Field/inverse]
            Discuss/threadViewer
        [Field/isReadonly]
            true
`;

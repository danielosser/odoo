/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            chatter
        [Field/model]
            ThreadViewer
        [Field/type]
            o2o
        [Field/target]
            Chatter
        [Field/inverse]
            Chatter/threadViewer
        [Field/isReadonly]
            true
`;

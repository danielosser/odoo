/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            chatWindow
        [Field/model]
            ThreadViewer
        [Field/type]
            o2o
        [Field/target]
            ChatWindow
        [Field/inverse]
            ChatWindow/threadViewer
        [Field/isReadonly]
            true
`;

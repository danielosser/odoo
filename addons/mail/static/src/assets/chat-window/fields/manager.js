/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            manager
        [Field/model]
            ChatWindow
        [Field/type]
            m2o
        [Field/target]
            ChatWindowManager
        [Field/inverse]
            ChatWindowManager/chatWindows
        [Field/isReadonly]
            true
`;

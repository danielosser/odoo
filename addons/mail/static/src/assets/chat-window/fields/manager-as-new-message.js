/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            managerAsNewMessage
        [Field/model]
            ChatWindow
        [Field/type]
            o2o
        [Field/target]
            ChatWindowManager
        [Field/inverse]
            ChatWindowManager/newMessageChatWindow
        [Field/isReadonly]
            true
`;

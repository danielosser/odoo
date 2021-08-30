/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            newMessageChatWindow
        [Field/model]
            ChatWindowManager
        [Field/type]
            o2o
        [Field/target]
            ChatWindow
        [Field/isCausal]
            true
        [Field/inverse]
            ChatWindow/managerAsNewMessage
`;

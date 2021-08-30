/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            chatWindows
        [Field/model]
            ChatWindowManager
        [Field/type]
            o2m
        [Field/target]
            ChatWindow
        [Field/inverse]
            ChatWindow/manager
        [Field/isCausal]
            true
`;

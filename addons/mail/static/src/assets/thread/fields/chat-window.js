/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        States the chat window related to this thread (if any).
    {Field}
        [Field/name]
            chatWindow
        [Field/model]
            Thread
        [Field/type]
            o2o
        [Field/target]
            ChatWindow
        [Field/inverse]
            ChatWindow/thread
        [Field/isCausal]
            true
`;

/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Model}
        [Model/name]
            MessageInReplyToView
        [Model/fields]
            messageView
        [Model/id]
            MessageInReplyToView/messageView
        [Model/actions]
            MessageInReplyToView/onClickReply
`;

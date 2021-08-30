/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        States the message on which this action message list operates.
    {Field}
        [Field/name]
            message
        [Field/model]
            MessageActionList
        [Field/type]
            m2o
        [Field/target]
            Message
        [Field/related]
            MessageActionList/messageView
            MessageView/message
`;

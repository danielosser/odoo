/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        States the message view that controls this message action list.
    {Field}
        [Field/name]
            messageView
        [Field/model]
            MessageActionList
        [Field/type]
            o2o
        [Field/target]
            MessageView
        [Field/isReadonly]
            true
        [Field/isRequired]
            true
        [Field/inverse]
            MessageView/messageActionList
`;

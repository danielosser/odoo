/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            messageView
        [Field/model]
            MessageInReplyToView
        [Field/type]
            o2o
        [Field/target]
            MessageView
        [Field/isRequired]
            true
        [Field/isReadonly]
            true
        [Field/inverse]
            MessageView/messageInReplyToView
`;

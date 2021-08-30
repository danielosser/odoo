/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        Determines the message that is displayed by this message view.
    {Field}
        [Field/name]
            message
        [Field/model]
            MessageView
        [Field/type]
            m2o
        [Field/target]
            Message
        [Field/isReadonly]
            true
        [Field/isRequired]
            true
        [Field/inverse]
            Message/messageViews
`;

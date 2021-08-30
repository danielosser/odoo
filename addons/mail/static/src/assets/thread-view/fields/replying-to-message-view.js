/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        Determines the message that's currently being replied to.
    {Field}
        [Field/name]
            replyingToMessageView
        [Field/model]
            ThreadView
        [Field/type]
            m2o
        [Field/target]
            MessageView
`;

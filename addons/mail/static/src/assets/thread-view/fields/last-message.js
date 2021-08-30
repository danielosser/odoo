/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        Last message in the context of the currently displayed thread cache.
    {Field}
        [Field/name]
            lastMessage
        [Field/model]
            ThreadView
        [Field/type]
            m2o
        [Field/target]
            Message
        [Field/related]
            ThreadView/thread
            Thread/lastMessage
`;

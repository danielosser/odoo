/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            guestAuthor
        [Field/model]
            Message
        [Field/type]
            m2o
        [Field/target]
            Guest
        [Field/inverse]
            Guest/authoredMessages
`;

/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            authoredMessages
        [Field/model]
            Guest
        [Field/type]
            o2m
        [Field/target]
            Message
        [Field/inverse]
            Message/guestAuthor
`;

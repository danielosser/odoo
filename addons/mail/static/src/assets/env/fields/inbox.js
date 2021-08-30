/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        Mailbox Inbox.
    {Field}
        [Field/name]
            inbox
        [Field/model]
            Env
        [Field/type]
            o2o
        [Field/target]
            Thread
`;

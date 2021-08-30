/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        Mailbox Starred.
    {Field}
        [Field/name]
            starred
        [Field/model]
            Env
        [Field/type]
            o2o
        [Field/target]
            Thread
`;

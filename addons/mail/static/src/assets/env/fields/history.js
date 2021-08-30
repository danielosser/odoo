/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        Mailbox History.
    {Field}
        [Field/name]
            history
        [Field/model]
            Env
        [Field/type]
            o2o
        [Field/target]
            Thread
`;

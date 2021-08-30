/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        Last message considered by the server.

        Useful to compute localMessageUnreadCounter field.

        @see localMessageUnreadCounter
    {Field}
        [Field/name]
            serverLastMessage
        [Field/model]
            Thread
        [Field/type]
            m2o
        [Field/target]
            Message
`;

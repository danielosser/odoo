/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        Contains the logs of the current session by token.
        { token: { name<String>, logs<Array> } }
    {Field}
        [Field/name]
            logs
        [Field/model]
            Rtc
        [Field/type]
            attr
        [Field/target]
            Object
        [Field/default]
            {Record/insert}
                [Record/traits]
                    Object
`;

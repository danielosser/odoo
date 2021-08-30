/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            messages
        [Field/model]
            ThreadView
        [Field/type]
            m2m
        [Field/target]
            Message
        [Field/related]
            ThreadView/threadCache
            ThreadCache/messages
`;

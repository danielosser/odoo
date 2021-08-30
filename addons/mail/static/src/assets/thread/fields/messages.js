/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        All messages that this thread is linked to.
        Note that this field is automatically computed by inverse
        computed field.
    {Field}
        [Field/name]
            messages
        [Field/model]
            Thread
        [Field/type]
            m2m
        [Field/target]
            Message
        [Field/inverse]
            Message/threads
`;

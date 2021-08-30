/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        Origin thread of this message (if any).
    {Field}
        [Field/name]
            originThread
        [Field/model]
            Message
        [Field/type]
            m2o
        [Field/target]
            Thread
        [Field/inverse]
            Thread/messagesAsOriginThread
`;

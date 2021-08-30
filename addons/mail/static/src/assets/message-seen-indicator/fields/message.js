/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        The message concerned by this seen indicator.
    {Field}
        [Field/name]
            message
        [Field/model]
            MessageSeenIndicator
        [Field/type]
            m2o
        [Field/target]
            Message
        [Field/inReadonly]
            true
        [FIeld/inverse]
            Message/messageSeenIndicators
`;

/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        The thread concerned by this seen indicator.
    {Field}
        [Field/name]
            thread
        [Field/model]
            MessageSeenIndicator
        [Field/type]
            m2o
        [Field/target]
            Thread
        [Field/isReadonly]
            true
        [Field/isRequired]
            true
        [Field/inverse]
            MessageSeenIndicator/messageSeenIndicators
`;

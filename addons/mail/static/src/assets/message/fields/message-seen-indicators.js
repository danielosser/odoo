/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            messageSeenIndicators
        [Field/model]
            Message
        [Field/type]
            o2m
        [Field/target]
            MessageSeenIndicator
        [Field/isCausal]
            true
        [Field/inverse]
            MessageSeenIndicator/message
`;

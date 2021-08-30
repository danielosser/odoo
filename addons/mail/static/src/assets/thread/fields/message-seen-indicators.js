/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        Contains the message fetched/seen indicators for all messages of this thread.
        FIXME This field should be readonly once task-2336946 is done.
    {Field}
        [Field/name]
            messageSeenIndicators
        [Field/model]
            Thread
        [Field/type]
            o2m
        [Field/target]
            MessageSeenIndicator
        [Field/inverse]
            MessageSeenIndicator/thread
        [Field/isCausal]
            true
`;

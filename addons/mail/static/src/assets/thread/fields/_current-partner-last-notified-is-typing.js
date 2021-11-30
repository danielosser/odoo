/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        Last 'is_typing' status of current partner that has been notified
        to other members. Useful to prevent spamming typing notifications
        to other members if it hasn't changed. An exception is the
        current partner long typing scenario where current partner has
        to re-send the same typing notification from time to time, so
        that other members do not assume he/she is no longer typing
        something from not receiving any typing notifications for a
        very long time.

        Supported values: true/false/undefined.
        undefined makes only sense initially and during current partner
        long typing timeout flow.
    {Field}
        [Field/name]
            _currentPartnerLastNotifiedIsTyping
        [Field/model]
            Thread
        [Field/type]
            o2o
        [Field/target]
            Timer
        [Field/isCausal]
            true
`;

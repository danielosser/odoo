/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        Clearable and cancellable throttled version of the
        '_notifyCurrentPartnerTypingStatus' method.
        This is useful when the current partner posts a message and
        types something else afterwards: it must notify immediately that
        he/she is typing something, instead of waiting for the throttle
        internal timer.

        @see _notifyCurrentPartnerTypingStatus
    {Field}
        [Field/name]
            _throttleNotifyCurrentPartnerTypingStatus
        [Field/model]
            Thread
        [Field/type]
            o2o
        [Field/target]
            Throttle
        [Field/isCausal]
            true
        [Field/default]
            {Record/insert}
                [Record/traits]
                    Throttle
                [Throttle/duration]
                    2500
                [Throttle/behavior]
                    {func}
                        [in]
                            isTyping
                        [out]
                            {Record/doAsync}
                                {func}
                                    {Thread/_notifyCurrentPartnerTypingStatus}
                                        [0]
                                            @record
                                        [1]
                                            [isTyping]
                                                @isTyping
`;
/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        Timer of current partner that was currently typing something, but
        there is no change on the input for 5 seconds. This is used
        in order to automatically notify other members that current
        partner has stopped typing something, due to making no changes
        on the composer for some time.
    {Field}
        [Field/name]
            _currentPartnerInactiveTypingTimer
        [Field/model]
            Thread
        [Field/type]
            o2o
        [Field/target]
            Timer
        [Field/isCausal]
            true
        [Field/default]
            {Record/insert}
                [Record/traits]
                    Timer
                [Timer/duration]
                    5000
                [Timer/timeout]
                    {func}
                        {Record/doAsync}
                            [0]
                                @record
                            [1]
                                {func}
                                    {if}
                                        {Env/currentPartner}
                                    .{then}
                                        {Thread/_onCurrentPartnerInactiveTypingTimeout}
                                            @record
`;

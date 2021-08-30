/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Action}
        [Action/name]
            Thread/_onCurrentPartnerInactiveTypingTimeout
        [Action/params]
            thread
                [type]
                    Thread
        [Action/behavior]
            {Record/doAsync}
                [0]
                    @thread
                [1]
                    {func}
                        {Thread/unregisterCurrentPartnerIsTyping}
                            @thread
`;

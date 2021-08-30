/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Action}
        [Action/name]
            MessagingInitializer/stop
        [Action/params]
            messagingInitializer
                [type]
                    MessagingInitializer
        [Action/behavior]
            {Device/stop}
`;
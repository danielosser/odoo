/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        Load new messages on the main cache of this thread.
    {Action}
        [Action/name]
            Thread/loadNewMessages
        [Action/params]
            thread
                [type]
                    Thread
        [Action/behavior]
            {ThreadCache/loadnewMessages}
                @thread
                .{Thread/cache}
`;

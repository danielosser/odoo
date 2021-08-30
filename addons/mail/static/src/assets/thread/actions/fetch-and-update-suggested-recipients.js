/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        Fetches suggested recipients.
    {Action}
        [Action/name]
            Thread/fetchAndUpdateSuggestedRecipients
        [Action/params]
            thread
                [type]
                    Thread
        [Action/behavior]
            {if}
                @thread
                .{Thread/isTemporary}
            .{then}
                {break}
            {Thread/performRpcMailGetSuggestedRecipients}
                [model]
                    @thread
                    .{Thread/model}
                [res_ids]
                    @thread
                    .{Thread/id}
`;

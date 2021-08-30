/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Action}
        [Action/name]
            Chatter/refresh
        [Action/params]
            chatter
        [Action/behavior]
            {if}
                @chatter
                .{Chatter/hasActivities}
            .{then}
                {Thread/refreshActivities}
                    @chatter
                    .{Chatter/thread}
            {if}
                @chatter
                .{Chatter/hasFollowers}
            .{then}
                {Thread/refreshFollowers}
                    @chatter
                    .{Chatter/thread}
                {Thread/fetchAndUpdateSuggestedRecipients}
                    @chatter
                    .{Chatter/thread}
            {if}
                @chatter
                .{Chatter/hasMessageList}
            .{then}
                {Thread/refresh}
                    @chatter
                    .{Chatter/thread}
`;

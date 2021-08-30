/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        Add current user to provided thread's followers.
    {Action}
        [Action/name]
            Thread/follow
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
                        @env
                        .{Env/owlEnv}
                        .{Dict/get}
                            services
                        .{Dict/get}
                            rpc
                        .{Function/call}
                            [model]
                                @thread
                                .{Thread/model}
                            [method]
                                message_subscribe
                            [args]
                                {Record/insert}
                                    [Record/traits]
                                        Collection
                                    {Record/insert}
                                        [Record/traits]
                                            Collection
                                        @thread
                                        .{Thread/id}
                            [kwargs]
                                [partner_ids]
                                    {Env/currentPartner}
                                    .{Partner/id}
            {Thread/refreshFollowers}
                @thread
            {Thread/fetchAndUpdateSuggestedRecipients}
                @thread
`;

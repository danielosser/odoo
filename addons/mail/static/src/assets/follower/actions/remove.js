/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        Remove this follower from its related thread.
    {Action}
        [Action/name]
            Follower/remove
        [Action/params]
            follower
                [type]
                    Follower
        [Action/behavior]
            {Record/doAsync}
                [0]
                    @follower
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
                                @follower
                                .{Follower/followedThread}
                                .{Thread/model}
                            [method]
                                message_unsubscribe
                            [args]
                                {Record/insert}
                                    [Record/traits]
                                        Collection
                                    [0]
                                        @follower
                                        .{Follower/followedThread}
                                        .{Thread/id}
                                    [1]
                                        @follower
                                        .{Follower/partner}
                                        .{Partner/id}
            {Record/delete}
                @follower
            {Thread/fetchAndUpdateSuggestedRecipients}
                @follower
                .{Follower/followedThread}
`;

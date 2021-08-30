/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        Unfollow current partner from this thread.
    {Action}
        [Action/name]
            Thread/unfollow
        [Action/params]
            thread
                [type]
                    Thread
        [Action/behavior]
            :currentPartnerFollower
                @thread
                .{Thread/followers}
                .{Collection/find}
                    {func}
                        [in]
                            item
                        [out]
                            @item
                            .{Follower/partner}
                            .{=}
                                {Env/currentPartner}
            {Record/doAsync}
                [0]
                    @thread
                [1]
                    {func}
                        {Follower/remove}
                            @currentPartnerFollower
`;

/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        Threads for which the current partner has a pending invitation
    {Field}
        [Field/name]
            ringingThreads
        [Field/model]
            Env
        [Field/type]
            m2m
        [Field/target]
            Thread
        [Field/compute]
            :threads
                {Record/all}
                    [Record/traits]
                        Thread
                .{Collection/filter}
                    {func}
                        [in]
                            item
                        [out]
                            @item
                            .{rtcInvitingSession}
                            .{isTruthy}
            @threads
`;

/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Action}
        [Action/name]
            Thread/computeLastCurrentPartnerMessageSeenByEveryone
        [Action/params]
            thread
                [type]
                    Thread
                [description]
                    the concerned thread
        [Action/behavior]
            :threads
                {if}
                    @thread
                .{then}
                    @thread
                .{else}
                    {Record/all}
                        [Record/traits]
                            Thread
            @threads
            .{Collection/map}
                {func}
                    [in]
                        localThread
                    [out]
                        {Record/update}
                            [0]
                                @localThread
                            [1]
                                [Thread/lastCurrentPartnerMessageSeenByEveryone]
                                    {Thread/_computeLastCurrentPartnerMessageSeenByEveryone}
                                        @localThread
`;

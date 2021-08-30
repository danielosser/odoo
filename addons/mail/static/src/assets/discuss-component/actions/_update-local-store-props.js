/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Action}
        [Action/name]
            DiscussComponent/_updateLocalStoreProps
        [Action/params]
            record
        [Action/behavior]
            {Record/update}
                [0]
                    @record
                [1]
                    [DiscussComponent/_lastThreadCache]
                        @record
                        .{DiscussComponent/discuss}
                        .{Discuss/threadView}
                        .{&}
                            @record
                            .{DiscussComponent/discuss}
                            .{Discuss/threadView}
                            .{ThreadView/threadCache}
                        .{&}
                            @record
                            .{DiscussComponent/discuss}
                            .{Discuss/threadView}
                            .{ThreadView/threadCache}
                            .{Record/id}
                    [DiscussComponent/_lastThreadCounter]
                        @record
                        .{DiscussComponent/discuss}
                        .{Discuss/thread}
                        .{&}
                            @record
                            .{DiscussComponent/discuss}
                            .{Discuss/thread}
                            .{Thread/counter}
`;

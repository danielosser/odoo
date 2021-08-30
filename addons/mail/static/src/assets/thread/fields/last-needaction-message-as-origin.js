/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            lastNeedactionMessageAsOrigin
        [Field/model]
            Thread
        [Field/type]
            m2o
        [Field/target]
            Message
        [Field/compute]
            :orderedNeedactionMessagesAsOriginThread
                @record
                .{Thread/needactionMessagesAsOriginThread}
                .{Collection/sort}
                    {func}
                        [in]
                            item1
                            item2
                        [out]
                            {if}
                                @item1
                                .{Message/id}
                                .{<}
                                    @item2
                                    .{Message/id}
                            .{then}
                                -1
                            .{else}
                                1
            {if}
                @orderedNeedactionMessagesAsOriginThread
                .{Collection/length}
                .{>}
                    0
            .{then}
                @orderedNeedactionMessagesAsOriginThread
                .{Collection/last}
            .{else}
                {Record/empty}
`;

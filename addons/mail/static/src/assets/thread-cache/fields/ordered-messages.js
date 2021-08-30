/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        Ordered list of messages linked to this cache.
    {Field}
        [Field/name]
            orderedMessages
        [Field/model]
            ThreadCache
        [Field/type]
            m2m
        [Field/target]
            Message
        [Field/compute]
            @record
            .{ThreadCache/messages}
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
`;

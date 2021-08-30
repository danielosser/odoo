/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        Ordered list of messages that have been fetched by this cache.

        This DOES NOT necessarily includes all messages linked to this thread
        cache (@see orderedMessages field for that). @see fetchedMessages
        field for deeper explanation about "fetched" messages.
    {Field}
        [Field/name]
            orderedFetchedMessages
        [Field/model]
            ThreadCache
        [Field/type]
            m2m
        [Field/target]
            Message
        [Field/compute]
            @record
            .{ThreadCache/fetchedMessages}
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

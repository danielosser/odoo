/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        List of messages linked to this cache.
    {Field}
        [Field/name]
            messages
        [Field/model]
            ThreadCache
        [Field/type]
            m2m
        [Field/target]
            Message
        [Field/compute]
            {if}
                @record
                .{ThreadCache/thread}
                .{isFalsy}
            .{then}
                {Record/empty}
                {break}
            :newerMessages
                {if}
                    @record
                    .{ThreadCache/lastFetchedMessage}
                    .{isFalsy}
                .{then}
                    @record
                    .{ThreadCache/thread}
                    .{Thread/messages}
                .{else}
                    @record
                    .{ThreadCache/thread}
                    .{Thread/messages}
                    .{Collection/filter}
                        {func}
                            [in]
                                item
                            [out]
                                @item
                                .{Message/id}
                                .{>}
                                    @record
                                    .{ThreadCache/lastFetchedMessage}
                                    .{Message/id}
            @record
            .{ThreadCache/fetchedMessages}
            .{Collection/concat}
                @newerMessages
`;

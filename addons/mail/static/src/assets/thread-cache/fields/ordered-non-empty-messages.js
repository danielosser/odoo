/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        List of ordered non empty messages linked to this cache.
    {Field}
        [Field/name]
            orderedNonEmptyMessages
        [Field/model]
            ThreadCache
        [Field/type]
            m2m
        [Field/target]
            Message
        [Field/compute]
            @record
            .{ThreadCache/orderedMessages}
            .{Collection/filter}
                {func}
                    [in]
                        message
                    [out]
                        @message
                        .{Message/isEmpty}
                        .{isFalsy}
`;

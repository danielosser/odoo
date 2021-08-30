/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            lastMessage
        [Field/model]
            ThreadCache
        [Field/type]
            m2o
        [Field/target]
            Message
        [Field/compute]
            {if}
                @record
                .{ThreadCache/orderedMessages}
                .{Collection/length}
                .{=}
                    0
            .{then}
                {Record/empty}
            .{else}
                @record
                .{ThreadCache/orderedMessages}
                .{Collection/last}
`;

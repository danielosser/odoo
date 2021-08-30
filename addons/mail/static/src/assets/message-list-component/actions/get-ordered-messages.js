/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Action}
        [Action/name]
            MessageListComponent/getOrderedMessages
        [Action/params]
            record
                [type]
                    MessageListComponent
        [Action/returns]
            Collection<Message>
        [Action/behavior]
            :threadCache
                @record
                .{MessageListComponent/threadView}
                .{ThreadView/threadCache}
            {if}
                @record
                .{MessageListComponent/order}
                .{=}
                    desc
            .{then}
                    @threadCache
                    .{ThreadCache/orderedMessages}
                    .{Collection/reverse}
            .{else}
                @threadCache
                .{ThreadCache/orderedMessages}
`;

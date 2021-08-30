/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            beforeMessages
        [Element/model]
            MessageListComponent
        [Element/isPresent]
            @record
            .{MessageListComponent/order}
            .{=}
                asc
            .{&}
                @record
                .{MessageListComponent/threadView}
                .{ThreadView/threadCache}
                .{ThreadCache/orderedNonEmptyMessages}
                .{Collection/length}
                .{!=}
                    0
        [web.Element/class]
            flex-grow-1
`;

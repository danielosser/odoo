/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            message
        [Element/model]
            MessageListComponent
        [Field/target]
            MessageViewComponent
        [Model/traits]
            MessageListComponent/item
        [Element/isPresent]
            @template
            .{Template/messageView}
            .{MessageView/message}
            .{Message/isEmpty}
            .{isFalsy}
        [Element/props]
            [MessageViewComponent/messageView]
                @template
                .{Template/messageView}
        [web.Element/style]
            {if}
                @record
                .{MessageListComponent/selectedMessage}
                .{!=}
                    @template
                    .{Template/message}
            .{then}
                {if}
                    @record
                    .{MessageListComponent/selectedMessage}
                .{then}
                    [web.scss/opacity]
                        0.5
`;

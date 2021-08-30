/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            separatorDate
        [Element/model]
            MessageListComponent
        [Model/traits]
            MessageListComponent/item
            MessageListComponent/separator
        [Element/isPresent]
            @template
            .{Template/message}
            .{Message/isEmpty}
            .{isFalsy}
            .{&}
                @template
                .{Template/currentDay}
                .{!=}
                    @template
                    .{Template/messageDay}
        [web.Element/class]
            pt-4
`;

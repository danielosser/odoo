/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            reaction
        [Element/model]
            MessageViewComponent
        [Element/t-foreach]
            @record
            .{MessageViewComponent/messageView}
            .{MessageView/message}
            .{Message/messageReactionGroups}
        [Element/t-as]
            messageReactionGroup
        [Element/t-key]
            @template
            .{Template/messageReactionGroup}
            .{Record/id}
        [Field/target]
            MessageReactionGroupComponent
        [Element/props]
            [MessageReactionGroupComponent/messageReactionGroup]
                @template
                .{Template/messageReactionGroup}
`;

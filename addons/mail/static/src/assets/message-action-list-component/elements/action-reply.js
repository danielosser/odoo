/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            actionReply
        [Field/model]
            MessageActionListComponent
        [Model/traits]
            MessageActionListComponent/action
        [Element/isPresent]
            @record
            .{MessageActionListComponent/messageActionList}
            .{MessageActionList/hasReplyIcon}
        [web.Element/class]
            fa-reply
        [web.Element/title]
            {Locale/text}
                Reply
        [Element/onClick]
            {MessageActionList/onClickReplyTo}
                @record
                .{MessageActionListComponent/messageActionList}
`;

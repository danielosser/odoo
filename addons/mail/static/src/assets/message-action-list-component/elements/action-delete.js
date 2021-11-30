/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            actionDelete
        [Field/model]
            MessageActionListComponent
        [Model/traits]
            MessageActionListComponent/action
        [Element/isPresent]
            @record
            .{MessageActionListComponent/messageActionList}
            .{MessageActionList/message}
            .{Message/canBeDeleted}
        [web.Element/class]
            fa-trash
        [web.Element/title]
            {Locale/text}
                Delete
        [Element/onClick]
            {MessageActionList/onClickDelete}
                @record
                .{MessageActionListComponent/messageActionList}
`;
